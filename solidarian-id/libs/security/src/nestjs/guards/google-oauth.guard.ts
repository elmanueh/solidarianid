import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions(context: ExecutionContext): Record<string, unknown> {
    void context;
    return { session: false };
  }

  handleRequest<TUser = unknown>(err: unknown, user: TUser): TUser {
    if (err || !user) {
      throw (err as Error) ?? new UnauthorizedException('Google OAuth authentication failed');
    }

    return user;
  }
}
