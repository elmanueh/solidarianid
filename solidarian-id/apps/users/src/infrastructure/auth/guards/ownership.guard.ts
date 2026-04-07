import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

interface AccessClaims {
  sub: string;
  jti?: string;
}

type OwnershipRequest = Request & {
  user?: AccessClaims;
  params: {
    id?: string;
  };
};

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<OwnershipRequest>();
    const authenticatedSub = request.user?.sub;
    const targetId = request.params?.id;

    if (!authenticatedSub) {
      throw new UnauthorizedException('Missing authenticated subject');
    }

    if (!targetId || authenticatedSub !== targetId) {
      throw new ForbiddenException('You can only access your own resource');
    }

    return true;
  }
}
