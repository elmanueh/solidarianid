import { AuthService } from '@app/users/domain/services/auth.service';
import { LoginUserDtoRequest } from '@app/users/infrastructure/presentation/dtos/login-user.request.dto';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import type { Request, Response } from 'express';

interface RefreshJwtPayload {
  sub: string;
  jti?: string;
}

@Controller('/api/auth')
@ApiTags('Auth')
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
    const refreshToken = (request.cookies?.RefreshToken as string | undefined) ?? '';
    if (!refreshToken) {
      response.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    const result = await this.authService.refresh(refreshToken);
    if (result.isLeft()) {
      response.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }

    this.setAuthCookies(response, result.value.accessToken, result.value.refreshToken);
    response.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request, @Res() response: Response): Promise<void> {
    const refreshToken = (request.cookies?.RefreshToken as string | undefined) ?? '';

    if (refreshToken) {
      try {
        const payload = await this.jwtService.verifyAsync<RefreshJwtPayload>(refreshToken, {
          algorithms: ['RS256'],
        });

        if (!payload.sub || !payload.jti) {
          response.status(HttpStatus.UNAUTHORIZED).send();
          return;
        }

        await this.authService.logoutCurrentSession(payload.jti);
      } catch {
        response.status(HttpStatus.UNAUTHORIZED).send();
        return;
      }
    }

    this.clearAuthCookies(response);
    response.status(HttpStatus.OK).send();
  }

  private setAuthCookies(response: Response, accessToken: string, refreshToken: string): void {
    const secure = process.env.NODE_ENV !== 'test';

    response.cookie('AccessToken', accessToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/api/auth/refresh',
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
      path: '/api/auth/refresh',
    });
  }

  private normalizeDeviceId(deviceIdHeader: string | undefined): string | undefined {
    const normalized = deviceIdHeader?.trim();
    return normalized ? normalized : undefined;
  }
}
