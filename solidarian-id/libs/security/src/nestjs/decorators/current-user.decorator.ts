import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import { resolveRequestFromContext } from '../utils/request-context.util';

export interface AuthenticatedUserClaims {
  sub: string;
  jti?: string;
}

type ClaimsRequest = Request & {
  user?: AuthenticatedUserClaims;
};

export function extractCurrentUserFromContext(
  key: keyof AuthenticatedUserClaims | undefined,
  context: ExecutionContext,
): AuthenticatedUserClaims | string | undefined {
  const request = resolveRequestFromContext(context) as ClaimsRequest;
  const user = request.user;

  if (!user) {
    return undefined;
  }

  return key ? user[key] : user;
}

export const CurrentUser = createParamDecorator(extractCurrentUserFromContext);
