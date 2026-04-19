import {
  AuthorizationMetadata,
  Action as SecurityAction,
  EntityType,
  MembershipRole,
  Resource,
} from '@solidarianid/security/core';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthorizationGuard } from './authorization.guard';
import { PolicyRegistry } from '../policies/policy-registry';

jest.mock('@nestjs/graphql', () => ({
  GqlExecutionContext: {
    create: jest.fn(),
  },
}));

type GuardContextFactoryInput = {
  metadata?: AuthorizationMetadata;
  subjectSub?: string;
  params?: Record<string, string>;
  body?: unknown;
  type?: 'http' | 'graphql';
  gqlArgs?: Record<string, unknown>;
};

const membershipMeta: AuthorizationMetadata = {
  action: SecurityAction.UPDATE,
  resource: Resource.COMMUNITY,
  policy: 'community.member',
  entityType: EntityType.CAUSE,
  entityId: {
    source: 'params',
    key: 'id',
  },
};

function createContext(input: GuardContextFactoryInput) {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(input.metadata),
  } as unknown as Reflector;

  const policyRegistry = {
    evaluate: jest.fn().mockResolvedValue(true),
  } as unknown as PolicyRegistry;

  const communityContextResolver = {
    resolve: jest.fn().mockResolvedValue({ communityId: 'community-1' }),
  };

  const membershipPermissionSource = {
    findRole: jest.fn().mockResolvedValue(MembershipRole.MEMBER),
  };

  const request = {
    user: input.subjectSub ? { sub: input.subjectSub } : undefined,
    params: input.params ?? {},
    body: input.body,
  };

  const executionContext = {
    getType: jest.fn().mockReturnValue(input.type ?? 'http'),
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(request),
    }),
  } as any;

  (GqlExecutionContext.create as jest.Mock).mockReturnValue({
    getContext: jest.fn().mockReturnValue({ req: request }),
    getArgs: jest.fn().mockReturnValue(input.gqlArgs ?? {}),
  });

  const guard = new AuthorizationGuard(
    reflector,
    policyRegistry,
    communityContextResolver as any,
    membershipPermissionSource as any,
  );

  return {
    guard,
    executionContext,
    policyRegistry,
    communityContextResolver,
    membershipPermissionSource,
  };
}

describe('AuthorizationGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows when there is no authorization metadata', async () => {
    const { guard, executionContext, policyRegistry } = createContext({ metadata: undefined });

    await expect(guard.canActivate(executionContext)).resolves.toBe(true);
    expect((policyRegistry.evaluate as jest.Mock).mock.calls.length).toBe(0);
  });

  it('denies membership policy when entityId cannot be resolved from params', async () => {
    const { guard, executionContext } = createContext({
      metadata: membershipMeta,
      subjectSub: 'user-1',
      params: {},
    });

    await expect(guard.canActivate(executionContext)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('dispatches community resolution for membership policy and passes resolved role to policy registry', async () => {
    const { guard, executionContext, policyRegistry, communityContextResolver, membershipPermissionSource } =
      createContext({
        metadata: membershipMeta,
        subjectSub: 'user-1',
        params: { id: 'cause-1' },
      });

    await expect(guard.canActivate(executionContext)).resolves.toBe(true);

    expect(communityContextResolver.resolve).toHaveBeenCalledWith({
      entityType: EntityType.CAUSE,
      entityId: 'cause-1',
    });
    expect(membershipPermissionSource.findRole).toHaveBeenCalledWith({
      userId: 'user-1',
      communityId: 'community-1',
    });

    const [, policyContext] = (policyRegistry.evaluate as jest.Mock).mock.calls[0];
    expect(policyContext.resolvedCommunityId).toBe('community-1');
    expect(policyContext.resolvedRole).toBe(MembershipRole.MEMBER);
  });

  it('reads args as entityId source for graphql context', async () => {
    const metadata: AuthorizationMetadata = {
      ...membershipMeta,
      entityId: {
        source: 'args',
        key: 'causeId',
      },
    };

    const { guard, executionContext, communityContextResolver } = createContext({
      metadata,
      subjectSub: 'user-1',
      type: 'graphql',
      gqlArgs: { causeId: 'cause-graphql-1' },
    });

    await expect(guard.canActivate(executionContext)).resolves.toBe(true);
    expect(communityContextResolver.resolve).toHaveBeenCalledWith({
      entityType: EntityType.CAUSE,
      entityId: 'cause-graphql-1',
    });
  });
});
