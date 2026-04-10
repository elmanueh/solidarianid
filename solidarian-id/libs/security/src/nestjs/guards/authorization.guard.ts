import { AuthorizationMetadata } from '@solidarianid/security/core';
import { AUTHORIZE_METADATA_KEY } from '../decorators/authorize.decorator';
import { PolicyRegistry } from '../policies/policy-registry';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

type AuthorizationRequest = Request & {
  user?: { sub: string; jti?: string };
  params: Record<string, string | undefined>;
};

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyRegistry: PolicyRegistry,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.getAllAndOverride<AuthorizationMetadata | undefined>(AUTHORIZE_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!metadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthorizationRequest>();
    const allowed = await this.policyRegistry.evaluate(metadata, {
      subject: {
        sub: request.user?.sub ?? '',
        jti: request.user?.jti,
      },
      params: request.params,
      body: request.body,
    });

    if (!allowed) {
      throw new ForbiddenException('Forbidden by authorization policy');
    }

    return true;
  }
}
