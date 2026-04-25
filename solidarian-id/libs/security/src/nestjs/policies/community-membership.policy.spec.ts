import { Action as SecurityAction, AuthorizationMetadata, MembershipRole, Resource } from '@solidarianid/security/core';
import { CommunityMembershipPolicyEvaluator } from './community-membership.policy';

const baseMeta = (policy: AuthorizationMetadata['policy']): AuthorizationMetadata => ({
  action: SecurityAction.UPDATE,
  resource: Resource.COMMUNITY,
  policy,
});

describe('CommunityMembershipPolicyEvaluator', () => {
  it('supports only community.* policies', () => {
    const evaluator = new CommunityMembershipPolicyEvaluator();

    expect(evaluator.supports(baseMeta('community.member'))).toBe(true);
    expect(evaluator.supports(baseMeta('community.creator'))).toBe(true);
    expect(evaluator.supports(baseMeta('community.member_or_creator'))).toBe(true);
    expect(evaluator.supports(baseMeta('self'))).toBe(false);
  });

  it.each([
    { policy: 'community.member' as const, role: MembershipRole.MEMBER, allowed: true },
    { policy: 'community.member' as const, role: MembershipRole.CREATOR, allowed: true },
    { policy: 'community.creator' as const, role: MembershipRole.CREATOR, allowed: true },
    { policy: 'community.creator' as const, role: MembershipRole.MEMBER, allowed: false },
    { policy: 'community.member_or_creator' as const, role: MembershipRole.MEMBER, allowed: true },
    { policy: 'community.member_or_creator' as const, role: MembershipRole.CREATOR, allowed: true },
  ])('evaluates $policy with role=$role -> $allowed', ({ policy, role, allowed }) => {
    const evaluator = new CommunityMembershipPolicyEvaluator();

    const result = evaluator.evaluate(baseMeta(policy), {
      subject: { sub: 'user-1' },
      resolvedRole: role,
      params: {},
    });

    expect(result).toBe(allowed);
  });

  it('denies when role is missing', () => {
    const evaluator = new CommunityMembershipPolicyEvaluator();

    const result = evaluator.evaluate(baseMeta('community.member'), {
      subject: { sub: 'user-1' },
      params: {},
      resolvedRole: null,
    });

    expect(result).toBe(false);
  });
});
