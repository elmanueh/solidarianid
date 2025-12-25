import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request, Response } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    if (request.session && request.session.user) {
      return true;
    } else {
      response.redirect('/login');
      return false;
    }
  }
}
