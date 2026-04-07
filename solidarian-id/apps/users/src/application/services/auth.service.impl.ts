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
import { createHash, randomUUID } from 'node:crypto';

interface JwtIdentityPayload {
  sub: string;
  jti?: string;
  nonce?: string;
}

@Injectable()
export class AuthServiceImpl extends AuthService {
  private static readonly ACCESS_TTL = '15m';
  private static readonly REFRESH_TTL = '90d';
  private readonly inFlightRefreshByJti = new Set<string>();

  constructor(
    private readonly usersService: UsersService,
    private readonly tokensRepository: TokensRepositoryPort,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async loginUsernamePassword(
    username: string,
    password: string,
    deviceId?: string,
  ): Promise<Either<LoginInvalidException, AuthTokens>> {
    const userOrError = await this.usersService.authenticate(username, password);
    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    return this.issueAndPersistTokens(userOrError.value.id, deviceId);
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

    if (!payloadOrError.value.jti) {
      return left(new Error('Invalid refresh token'));
    }

    const jti = UniqueEntityID.create(payloadOrError.value.jti);
    if (jti.isLeft()) {
      return left(jti.value);
    }

    if (this.inFlightRefreshByJti.has(jti.value.value)) {
      return left(new Error('Invalid refresh session'));
    }

    this.inFlightRefreshByJti.add(jti.value.value);

    try {
      const activeSessionOrError = await this.tokensRepository.findByJti(jti.value);
      if (activeSessionOrError.isLeft()) {
        return left(activeSessionOrError.value);
      }

      if (!activeSessionOrError.value.userId.equals(userId.value)) {
        return left(new Error('Invalid refresh token'));
      }

      const incomingHash = this.hashToken(refreshToken);
      if (!activeSessionOrError.value.isActive() || !activeSessionOrError.value.matchesHash(incomingHash)) {
        return left(new Error('Invalid refresh session'));
      }

      activeSessionOrError.value.touchRefreshedAt();

      const saveResult = await this.tokensRepository.save(activeSessionOrError.value);
      if (saveResult.isLeft()) {
        return left(saveResult.value);
      }

      const accessToken = await this.jwtService.signAsync(
        { sub: userId.value.value },
        {
          algorithm: 'RS256',
          expiresIn: AuthServiceImpl.ACCESS_TTL,
        },
      );

      return right({
        userId: userId.value.value,
        accessToken,
        refreshToken,
      });
    } finally {
      this.inFlightRefreshByJti.delete(jti.value.value);
    }
  }

  async logoutCurrentSession(jti: string): Promise<Either<Error, void>> {
    const jtiOrError = UniqueEntityID.create(jti);
    if (jtiOrError.isLeft()) {
      return left(jtiOrError.value);
    }

    const sessionOrError = await this.tokensRepository.findByJti(jtiOrError.value);
    if (sessionOrError.isLeft()) {
      if (sessionOrError.value instanceof EntityNotFoundException) {
        return right(undefined);
      }

      return left(sessionOrError.value);
    }

    sessionOrError.value.revoke();

    const saveResult = await this.tokensRepository.save(sessionOrError.value);
    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    return right(undefined);
  }

  private async issueAndPersistTokens(userId: UniqueEntityID, deviceId?: string): Promise<Either<Error, AuthTokens>> {
    const refreshEntityOrError = RefreshToken.create({
      userId,
      tokenHash: 'pending-refresh-hash',
      expiresAt: this.calculateExpiryDate(90),
      revokedAt: null,
      refreshedAt: new Date(),
      deviceId: deviceId ?? null,
    });

    if (refreshEntityOrError.isLeft()) {
      return left(refreshEntityOrError.value);
    }

    const refreshEntity = refreshEntityOrError.value;

    const payload: JwtIdentityPayload = {
      sub: userId.value,
      jti: refreshEntity.id.value,
      nonce: randomUUID(),
    };

    const accessToken = await this.jwtService.signAsync(
      { sub: payload.sub },
      {
        algorithm: 'RS256',
        expiresIn: AuthServiceImpl.ACCESS_TTL,
      },
    );

    const refreshToken = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: AuthServiceImpl.REFRESH_TTL,
    });

    const setHashResult = refreshEntity.setTokenHash(this.hashToken(refreshToken));
    if (setHashResult.isLeft()) {
      return left(setHashResult.value);
    }

    const saveResult = await this.tokensRepository.save(refreshEntity);
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

      if (!payload.sub || !payload.jti) {
        return left(new Error('Invalid token payload'));
      }

      return right({ sub: payload.sub, jti: payload.jti });
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
