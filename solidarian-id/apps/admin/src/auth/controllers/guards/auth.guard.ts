import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    if (request.session && request.session.adminId) {
      return true;
    } else {
      response.redirect('/login');
      return false;
    }
  }
}
