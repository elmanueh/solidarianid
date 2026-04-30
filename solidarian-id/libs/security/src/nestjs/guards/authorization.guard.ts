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
    const actorId = request.user?.sub;
    const targetEntityId = this.resolveRuntimeEntityId(metadata.entityId, context, request);

    let resolvedCommunityId: string | undefined;
    let resolvedRole: MembershipRole | null | undefined;

    if (isCommunityMembershipPolicy(metadata.policy)) {
      if (!metadata.resource || !targetEntityId || !this.communityContextResolver || !this.membershipPermissionSource) {
        throw new ForbiddenException('Forbidden by authorization policy');
      }

      const communityContext = await this.communityContextResolver.resolve({
        resource: metadata.resource,
        entityId: targetEntityId,
      });

      if (!communityContext?.communityId) {
        throw new ForbiddenException('Forbidden by authorization policy');
      }

      resolvedCommunityId = communityContext.communityId;
      resolvedRole = await this.membershipPermissionSource.findRole({
        userId: actorId ?? '',
        communityId: communityContext.communityId,
      });
    }

    const allowed = await this.policyRegistry.evaluate(metadata, {
      subject: {
        sub: request.user?.sub ?? '',
        jti: request.user?.jti,
      },
      resolvedEntityId: targetEntityId,
      resolvedCommunityId,
      resolvedRole,
    });

    if (!allowed) {
      throw new ForbiddenException('Forbidden by authorization policy');
    }

    return true;
  }

  private resolveRuntimeEntityId(
    entityIdDescriptor: string | undefined,
    context: ExecutionContext,
    request: AuthorizationRequest,
  ): string | undefined {
    if (!entityIdDescriptor) {
      return undefined;
    }

    if (context.getType<string>() === 'graphql') {
      const gqlArgs = GqlExecutionContext.create(context).getArgs<Record<string, unknown>>();
      return this.resolvePath(gqlArgs, entityIdDescriptor);
    }

    return this.resolvePath(request.params, entityIdDescriptor) ?? this.resolvePath(request.body, entityIdDescriptor);
  }

  private resolvePath(source: unknown, path: string): string | undefined {
    if (!source || typeof source !== 'object') {
      return undefined;
    }

    const sourceAsRecord = source as Record<string, unknown>;

    const direct = sourceAsRecord[path];
    if (typeof direct === 'string') {
      return direct;
    }

    if (!path.includes('.')) {
      return undefined;
    }

    const resolved = path.split('.').reduce<unknown>((acc, segment) => {
      if (!acc || typeof acc !== 'object') {
        return undefined;
      }

      return (acc as Record<string, unknown>)[segment];
    }, sourceAsRecord);

    return typeof resolved === 'string' ? resolved : undefined;
  }
}
