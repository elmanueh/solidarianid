import { DynamicModule, InjectionToken, Module, Provider } from '@nestjs/common';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AUTHZ_POLICY_EVALUATORS, PolicyRegistry } from './policies/policy-registry';

type SecurityAuthorizationModuleOptions = {
  evaluators: Provider[];
};

@Module({})
export class SecurityAuthorizationModule {
  static register(options: SecurityAuthorizationModuleOptions): DynamicModule {
    const evaluatorTokens = options.evaluators.map(provider =>
      SecurityAuthorizationModule.resolveProviderToken(provider),
    );

    return {
      module: SecurityAuthorizationModule,
      providers: [
        PolicyRegistry,
        AuthorizationGuard,
        ...options.evaluators,
        {
          provide: AUTHZ_POLICY_EVALUATORS,
          useFactory: (...evaluators: unknown[]) => evaluators,
          inject: evaluatorTokens,
        },
      ],
      exports: [AuthorizationGuard, PolicyRegistry, AUTHZ_POLICY_EVALUATORS],
    };
  }

  private static resolveProviderToken(provider: Provider): InjectionToken {
    if (typeof provider === 'function' || typeof provider === 'string' || typeof provider === 'symbol') {
      return provider;
    }

    return provider.provide;
  }
}
