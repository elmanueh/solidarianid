import {
  AuthorizationMetadata,
  Action as SecurityAction,
  CommunityContextResolver,
  EntityType,
  MembershipPermissionSource,
  MembershipRole,
  PolicyContext,
  Resource,
} from '@solidarianid/security/core';
import { ForbiddenException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
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

type AuthorizationRequest = {
  user?: { sub: string; jti?: string };
  params: Record<string, string | undefined>;
  body?: unknown;
};

type TestContext = {
  guard: AuthorizationGuard;
  executionContext: ExecutionContext;
  evaluateMock: jest.MockedFunction<PolicyRegistry['evaluate']>;
  resolveCommunityMock: jest.MockedFunction<CommunityContextResolver['resolve']>;
  findRoleMock: jest.MockedFunction<MembershipPermissionSource['findRole']>;
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

function createContext(input: GuardContextFactoryInput): TestContext {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(input.metadata),
  } as unknown as Reflector;

  const evaluateMock: jest.MockedFunction<PolicyRegistry['evaluate']> = jest.fn().mockResolvedValue(true);

  const policyRegistry = {
    evaluate: evaluateMock,
  } as unknown as PolicyRegistry;

  const resolveCommunityMock: jest.MockedFunction<CommunityContextResolver['resolve']> = jest
    .fn()
    .mockResolvedValue({ communityId: 'community-1' });

  const communityContextResolver = {
    resolve: resolveCommunityMock,
  } as unknown as CommunityContextResolver;

  const findRoleMock: jest.MockedFunction<MembershipPermissionSource['findRole']> = jest
    .fn()
    .mockResolvedValue(MembershipRole.MEMBER);

  const membershipPermissionSource = {
    findRole: findRoleMock,
  } as unknown as MembershipPermissionSource;

  const request: AuthorizationRequest = {
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
  } as unknown as ExecutionContext;

  const gqlCreateMock = jest.spyOn(GqlExecutionContext, 'create');
  gqlCreateMock.mockReturnValue({
    getContext: jest.fn().mockReturnValue({ req: request }),
    getArgs: jest.fn().mockReturnValue(input.gqlArgs ?? {}),
  } as unknown as GqlExecutionContext);

  const guard = new AuthorizationGuard(reflector, policyRegistry, communityContextResolver, membershipPermissionSource);

  return {
    guard,
    executionContext,
    evaluateMock,
    resolveCommunityMock,
    findRoleMock,
  };
}

describe('AuthorizationGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows when there is no authorization metadata', async () => {
    const { guard, executionContext, evaluateMock } = createContext({ metadata: undefined });

    await expect(guard.canActivate(executionContext)).resolves.toBe(true);
    expect(evaluateMock).not.toHaveBeenCalled();
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
    const { guard, executionContext, evaluateMock, resolveCommunityMock, findRoleMock } = createContext({
      metadata: membershipMeta,
      subjectSub: 'user-1',
      params: { id: 'cause-1' },
    });

    await expect(guard.canActivate(executionContext)).resolves.toBe(true);

    expect(resolveCommunityMock).toHaveBeenCalledWith({
      entityType: EntityType.CAUSE,
      entityId: 'cause-1',
    });
    expect(findRoleMock).toHaveBeenCalledWith({
      userId: 'user-1',
      communityId: 'community-1',
    });

    const policyContext = evaluateMock.mock.calls[0]?.[1] as PolicyContext | undefined;
    if (!policyContext) {
      throw new Error('Policy context was not provided to PolicyRegistry.evaluate');
    }
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

    const { guard, executionContext, resolveCommunityMock } = createContext({
      metadata,
      subjectSub: 'user-1',
      type: 'graphql',
      gqlArgs: { causeId: 'cause-graphql-1' },
    });

    await expect(guard.canActivate(executionContext)).resolves.toBe(true);
    expect(resolveCommunityMock).toHaveBeenCalledWith({
      entityType: EntityType.CAUSE,
      entityId: 'cause-graphql-1',
    });
  });
});
