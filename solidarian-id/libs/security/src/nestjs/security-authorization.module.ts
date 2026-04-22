import { CommunityContextResolver, MembershipPermissionSource } from '@solidarianid/security/core';
import { DynamicModule, InjectionToken, Module, Provider } from '@nestjs/common';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AUTHZ_POLICY_EVALUATORS, PolicyRegistry } from './policies/policy-registry';

export const AUTHZ_COMMUNITY_CONTEXT_RESOLVER = Symbol('AUTHZ_COMMUNITY_CONTEXT_RESOLVER');
export const AUTHZ_MEMBERSHIP_PERMISSION_SOURCE = Symbol('AUTHZ_MEMBERSHIP_PERMISSION_SOURCE');

type SecurityAuthorizationModuleOptions = {
  imports?: DynamicModule['imports'];
  evaluators: Provider[];
  communityContextResolver?: Provider;
  membershipPermissionSource?: Provider;
};

@Module({})
export class SecurityAuthorizationModule {
  static register(options: SecurityAuthorizationModuleOptions): DynamicModule {
    const evaluatorTokens = options.evaluators.map(provider =>
      SecurityAuthorizationModule.resolveProviderToken(provider),
    );
    const communityContextResolverToken = options.communityContextResolver
      ? SecurityAuthorizationModule.resolveProviderToken(options.communityContextResolver)
      : undefined;
    const membershipPermissionSourceToken = options.membershipPermissionSource
      ? SecurityAuthorizationModule.resolveProviderToken(options.membershipPermissionSource)
      : undefined;

    return {
      module: SecurityAuthorizationModule,
      imports: options.imports,
      providers: [
        PolicyRegistry,
        AuthorizationGuard,
        ...options.evaluators,
        ...(options.communityContextResolver ? [options.communityContextResolver] : []),
        ...(options.membershipPermissionSource ? [options.membershipPermissionSource] : []),
        {
          provide: AUTHZ_POLICY_EVALUATORS,
          useFactory: (...evaluators: unknown[]) => evaluators,
          inject: evaluatorTokens,
        },
        {
          provide: AUTHZ_COMMUNITY_CONTEXT_RESOLVER,
          useFactory: (resolver?: CommunityContextResolver) => resolver,
          inject: communityContextResolverToken ? [communityContextResolverToken] : [],
        },
        {
          provide: AUTHZ_MEMBERSHIP_PERMISSION_SOURCE,
          useFactory: (source?: MembershipPermissionSource) => source,
          inject: membershipPermissionSourceToken ? [membershipPermissionSourceToken] : [],
        },
      ],
      exports: [
        AuthorizationGuard,
        PolicyRegistry,
        AUTHZ_POLICY_EVALUATORS,
        AUTHZ_COMMUNITY_CONTEXT_RESOLVER,
        AUTHZ_MEMBERSHIP_PERMISSION_SOURCE,
      ],
    };
  }

  private static resolveProviderToken(provider: Provider): InjectionToken {
    if (typeof provider === 'function' || typeof provider === 'string' || typeof provider === 'symbol') {
      return provider;
    }

    return provider.provide;
  }
}
