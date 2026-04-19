import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  AuthorizationMetadata,
  CommunityContextResolver,
  MembershipPermissionSource,
  MembershipRole,
  isCommunityMembershipPolicy,
} from '@solidarianid/security/core';
import type { Request } from 'express';
import { AUTHORIZE_METADATA_KEY } from '../decorators/authorize.decorator';
import { PolicyRegistry } from '../policies/policy-registry';
import { AUTHZ_COMMUNITY_CONTEXT_RESOLVER, AUTHZ_MEMBERSHIP_PERMISSION_SOURCE } from '../security-authorization.module';
import { resolveRequestFromContext } from '../utils/request-context.util';

type AuthorizationRequest = Request & {
  user?: { sub: string; jti?: string };
  params: Record<string, string | undefined>;
  body?: unknown;
};

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyRegistry: PolicyRegistry,
    @Optional()
    @Inject(AUTHZ_COMMUNITY_CONTEXT_RESOLVER)
    private readonly communityContextResolver?: CommunityContextResolver,
    @Optional()
    @Inject(AUTHZ_MEMBERSHIP_PERMISSION_SOURCE)
    private readonly membershipPermissionSource?: MembershipPermissionSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.getAllAndOverride<AuthorizationMetadata | undefined>(AUTHORIZE_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!metadata) {
      return true;
    }

    const request = resolveRequestFromContext(context) as AuthorizationRequest;
    const runtimeEntityId = this.resolveRuntimeEntityId(metadata, context, request);

    let resolvedCommunityId: string | undefined;
    let resolvedRole: MembershipRole | null | undefined;

    if (isCommunityMembershipPolicy(metadata.policy)) {
      if (
        !metadata.entityType ||
        !runtimeEntityId ||
        !this.communityContextResolver ||
        !this.membershipPermissionSource
      ) {
        throw new ForbiddenException('Forbidden by authorization policy');
      }

      const communityContext = await this.communityContextResolver.resolve({
        entityType: metadata.entityType,
        entityId: runtimeEntityId,
      });

      if (!communityContext?.communityId) {
        throw new ForbiddenException('Forbidden by authorization policy');
      }

      resolvedCommunityId = communityContext.communityId;
      resolvedRole = await this.membershipPermissionSource.findRole({
        userId: request.user?.sub ?? '',
        communityId: communityContext.communityId,
      });
    }

    const allowed = await this.policyRegistry.evaluate(metadata, {
      subject: {
        sub: request.user?.sub ?? '',
        jti: request.user?.jti,
      },
      resolvedCommunityId,
      resolvedRole,
      params: request.params,
      body: request.body,
    });

    if (!allowed) {
      throw new ForbiddenException('Forbidden by authorization policy');
    }

    return true;
  }

  private resolveRuntimeEntityId(
    metadata: AuthorizationMetadata,
    context: ExecutionContext,
    request: AuthorizationRequest,
  ): string | undefined {
    if (!metadata.entityId) {
      return undefined;
    }

    const selector = metadata.entityId;

    if (selector.source === 'params') {
      return request.params?.[selector.key];
    }

    if (selector.source === 'body') {
      if (typeof request.body === 'object' && request.body !== null) {
        const value = (request.body as Record<string, unknown>)[selector.key];
        return typeof value === 'string' ? value : undefined;
      }

      return undefined;
    }

    if (context.getType<string>() !== 'graphql') {
      return undefined;
    }

    const gqlArgs = GqlExecutionContext.create(context).getArgs<Record<string, unknown>>();
    const value = gqlArgs?.[selector.key];
    return typeof value === 'string' ? value : undefined;
  }
}
