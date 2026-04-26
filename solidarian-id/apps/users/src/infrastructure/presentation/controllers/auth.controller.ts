import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { AuthService } from '@app/users/domain/services/auth.service';
import { LoginUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/login-user.request.dto';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard, Public } from '@solidarianid/security/nestjs';
import type { Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

interface RefreshJwtPayload {
  sub: string;
  jti?: string;
}

interface OAuthAuthenticatedUser {
  user?: {
    id?: {
      value?: string;
    };
  };
  newUser?: boolean;
  oauthErrorMessage?: string;
}

@Controller('/api/auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() request: Request, @Res() response: Response): Promise<void> {
    try {
      const oauthUser = request.user as OAuthAuthenticatedUser | undefined;
      const userId = oauthUser?.user?.id?.value;
      const newUser = oauthUser?.newUser;

      const oauthErrorMessage = oauthUser?.oauthErrorMessage;

      if (!userId) {
        response.redirect(this.buildGoogleFailureRedirectUrl(oauthErrorMessage ?? 'OAuth user not found'));
        return;
      }

      const deviceId = this.normalizeDeviceId(request.header('X-Device-Id'));
      const result = await this.authService.loginAuthenticatedUser(userId, deviceId);

      if (result.isLeft()) {
        response.redirect(this.buildGoogleFailureRedirectUrl(this.extractErrorMessage(result.value)));
        return;
      }

      this.setAuthCookies(response, result.value.accessToken, result.value.refreshToken);
      response.redirect(this.resolveGoogleSuccessRedirectUrl(newUser));
    } catch (error) {
      response.redirect(this.buildGoogleFailureRedirectUrl(this.extractErrorMessage(error)));
    }
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

  private resolveGoogleSuccessRedirectUrl(newUser?: boolean): string {
    const defaultSuccessUrlIfExists = this.configService.get<string>('OAUTH_SUCCESS_REDIRECT_URL_IF_EXISTS')?.trim();
    const defaultSuccessUrlIfNotExists = this.configService
      .get<string>('OAUTH_SUCCESS_REDIRECT_URL_IF_NOT_EXISTS')
      ?.trim();

    if (newUser === true && defaultSuccessUrlIfNotExists) {
      return defaultSuccessUrlIfNotExists;
    }

    if (newUser === false && defaultSuccessUrlIfExists) {
      return defaultSuccessUrlIfExists;
    }

    const fallbackUrl = `${this.configService.get<string>('FRONTEND_URL')?.trim() ?? ''}/home`;
    return fallbackUrl;
  }

  private resolveGoogleFailureRedirectUrl(): string {
    const explicitFailureUrl = this.configService.get<string>('OAUTH_FAILURE_REDIRECT_URL')?.trim();
    if (explicitFailureUrl) {
      return explicitFailureUrl;
    }

    const frontendRaw = this.configService.get<string>('FRONTEND_URL') ?? '';
    const firstFrontend = frontendRaw
      .split(',')
      .map(url => url.trim())
      .find(Boolean);

    return firstFrontend || '/login';
  }

  private buildGoogleFailureRedirectUrl(errorMessage: string): string {
    const baseFailureUrl = this.resolveGoogleFailureRedirectUrl();
    const normalizedErrorMessage = errorMessage?.trim() || 'oauth_failed';

    try {
      const url = new URL(baseFailureUrl);
      url.searchParams.set('errorMessage', normalizedErrorMessage);
      return url.toString();
    } catch {
      const separator = baseFailureUrl.includes('?') ? '&' : '?';
      return `${baseFailureUrl}${separator}errorMessage=${encodeURIComponent(normalizedErrorMessage)}`;
    }
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    if (typeof error === 'string' && error.trim()) {
      return error;
    }

    return 'oauth_failed';
  }
}
