import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface AuthenticatedUserClaims {
  sub: string;
  jti?: string;
}

type ClaimsRequest = Request & {
  user?: AuthenticatedUserClaims;
};

export const CurrentUser = createParamDecorator(
  (key: keyof AuthenticatedUserClaims | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<ClaimsRequest>();
    const user = request.user;

    if (!user) {
      return undefined;
    }

    return key ? user[key] : user;
  },
);
