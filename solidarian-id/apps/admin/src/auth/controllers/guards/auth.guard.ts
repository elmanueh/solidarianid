import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request>();

    if (request.session?.user) return true;

    throw new UnauthorizedException();
  }
}
