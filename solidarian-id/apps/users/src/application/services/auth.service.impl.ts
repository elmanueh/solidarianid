import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { LoginInvalidException } from '@app/users/domain/errors/login-invalid.exception';
import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { TokensRepositoryPort } from '@app/users/domain/ports/tokens.repository.port';
import { AuthService, AuthTokens } from '@app/users/domain/services/auth.service';
import { UsersService } from '@app/users/domain/services/users.service';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'node:crypto';

interface JwtIdentityPayload {
  sub: string;
}

@Injectable()
export class AuthServiceImpl extends AuthService {
  private static readonly ACCESS_TTL = '15m';
  private static readonly REFRESH_TTL = '90d';

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensRepository: TokensRepositoryPort,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async loginUsernamePassword(username: string, password: string): Promise<Either<LoginInvalidException, AuthTokens>> {
    const userOrError = await this.usersService.authenticate(username, password);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    return this.issueAndPersistTokens(userOrError.value.id);
  }

  async refresh(refreshToken: string): Promise<Either<Error, AuthTokens>> {
    const payloadOrError = await this.verifyRefreshToken(refreshToken);
    if (payloadOrError.isLeft()) {
      return left(payloadOrError.value);
    }

    const userId = UniqueEntityID.create(payloadOrError.value.sub);
    if (userId.isLeft()) {
      return left(userId.value);
    }

    const activeSessionOrError = await this.tokensRepository.findByUserId(userId.value);
    if (activeSessionOrError.isLeft()) {
      return left(activeSessionOrError.value);
    }

    const incomingHash = this.hashToken(refreshToken);
    if (!activeSessionOrError.value.isActive() || !activeSessionOrError.value.matchesHash(incomingHash)) {
      return left(new Error('Invalid refresh session'));
    }

    return this.issueAndPersistTokens(userId.value);
  }

  async logout(userId: string): Promise<Either<Error, void>> {
    const userIdOrError = UniqueEntityID.create(userId);
    if (userIdOrError.isLeft()) {
      return left(userIdOrError.value);
    }

    const existingRefreshOrError = await this.tokensRepository.findByUserId(userIdOrError.value);
    if (existingRefreshOrError.isLeft()) {
      if (existingRefreshOrError.value instanceof EntityNotFoundException) {
        return right(undefined);
      }

      return left(existingRefreshOrError.value);
    }

    existingRefreshOrError.value.revoke();
    const saveResult = await this.tokensRepository.save(existingRefreshOrError.value);
    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    return right(undefined);
  }

  private async issueAndPersistTokens(userId: UniqueEntityID): Promise<Either<Error, AuthTokens>> {
    let existingRefreshId: string | null = null;

    const existingRefreshOrError = await this.tokensRepository.findByUserId(userId);
    if (existingRefreshOrError.isLeft()) {
      if (!(existingRefreshOrError.value instanceof EntityNotFoundException)) {
        return left(existingRefreshOrError.value);
      }
    } else {
      existingRefreshId = existingRefreshOrError.value.id.value;
      existingRefreshOrError.value.revoke();
      const revokeSaveResult = await this.tokensRepository.save(existingRefreshOrError.value);
      if (revokeSaveResult.isLeft()) {
        return left(revokeSaveResult.value);
      }

      const removeResult = await this.tokensRepository.remove(existingRefreshId);
      if (removeResult.isLeft()) {
        return left(removeResult.value);
      }
    }

    const payload: JwtIdentityPayload = { sub: userId.value };

    const accessToken = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: AuthServiceImpl.ACCESS_TTL,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: AuthServiceImpl.REFRESH_TTL,
    });

    const refreshEntityOrError = RefreshToken.create({
      userId,
      tokenHash: this.hashToken(refreshToken),
      expiresAt: this.calculateExpiryDate(90),
      revokedAt: null,
      rotatedAt: new Date(),
    });

    if (refreshEntityOrError.isLeft()) {
      return left(refreshEntityOrError.value);
    }

    const saveResult = await this.tokensRepository.save(refreshEntityOrError.value);
    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    return right({
      userId: userId.value,
      accessToken,
      refreshToken,
    });
  }

  private async verifyRefreshToken(refreshToken: string): Promise<Either<Error, JwtIdentityPayload>> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtIdentityPayload>(refreshToken, {
        algorithms: ['RS256'],
      });

      if (!payload.sub) {
        return left(new Error('Invalid token payload'));
      }

      return right({ sub: payload.sub });
    } catch {
      return left(new Error('Invalid refresh token'));
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private calculateExpiryDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}
