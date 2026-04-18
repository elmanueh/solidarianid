import { AuthService } from '@app/users/domain/services/auth.service';
import { LoginUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/login-user.request.dto';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Public } from '@solidarianid/security/nestjs';
import type { Request, Response } from 'express';

interface RefreshJwtPayload {
  sub: string;
  jti?: string;
}

@Controller('/api/auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() dto: LoginUserDtoRequest,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const deviceId = this.normalizeDeviceId(request.header('X-Device-Id'));

    const result = await this.authService.loginUsernamePassword(dto.username, dto.password, deviceId);
    if (result.isLeft()) {
      throw result.value;
    }

    this.setAuthCookies(response, result.value.accessToken, result.value.refreshToken);
    response.status(HttpStatus.OK).send();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: Request, @Res() response: Response): Promise<void> {
    const refreshToken = this.getRefreshTokenFromRequest(request);
    if (!refreshToken) {
      response.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    const result = await this.authService.refresh(refreshToken);
    if (result.isLeft()) {
      if (result.value instanceof JsonWebTokenError) {
        response.status(HttpStatus.UNAUTHORIZED).send();
        return;
      }

      if (result.value instanceof EntityNotFoundException) {
        response.status(HttpStatus.UNAUTHORIZED).send();
        return;
      }

      throw result.value;
    }

    this.setAccessTokenCookie(response, result.value.accessToken);
    response.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request, @Res() response: Response): Promise<void> {
    const refreshToken = this.getRefreshTokenFromRequest(request);

    if (refreshToken) {
      try {
        const payload = await this.jwtService.verifyAsync<RefreshJwtPayload>(refreshToken, {
          algorithms: ['RS256'],
        });

        if (!payload.sub || !payload.jti) {
          response.status(HttpStatus.UNAUTHORIZED).send();
          return;
        }

        const logoutResult = await this.authService.logoutCurrentSession(payload.jti);
        if (logoutResult.isLeft()) {
          response.status(HttpStatus.UNAUTHORIZED).send();
          return;
        }
      } catch {
        response.status(HttpStatus.UNAUTHORIZED).send();
        return;
      }
    }

    this.clearAuthCookies(response);
    response.status(HttpStatus.OK).send();
  }

  private setAuthCookies(response: Response, accessToken: string, refreshToken: string): void {
    this.setAccessTokenCookie(response, accessToken);
    this.setRefreshTokenCookie(response, refreshToken);
  }

  private setAccessTokenCookie(response: Response, accessToken: string): void {
    const secure = process.env.NODE_ENV !== 'test';

    response.cookie('AccessToken', accessToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });
  }

  private setRefreshTokenCookie(response: Response, refreshToken: string): void {
    const secure = process.env.NODE_ENV !== 'test';

    response.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });
  }

  private clearAuthCookies(response: Response): void {
    const secure = process.env.NODE_ENV !== 'test';

    response.clearCookie('AccessToken', {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
    });

    response.clearCookie('RefreshToken', {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/api/auth',
    });
  }

  private normalizeDeviceId(deviceIdHeader: string | undefined): string | undefined {
    const normalized = deviceIdHeader?.trim();
    return normalized ? normalized : undefined;
  }

  private getRefreshTokenFromRequest(request: Request): string {
    const cookieHeader = request.header('cookie') ?? '';
    const match = cookieHeader.match(/(?:^|;\s*)RefreshToken=([^;]+)/);
    if (match?.[1]) {
      return match[1];
    }

    const fromCookies = (request.cookies?.RefreshToken as string | undefined) ?? '';
    return fromCookies;
  }
}
