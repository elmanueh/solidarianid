import {
  AuthorizationMetadata,
  CommunityMembershipPolicy as CommunityMembershipPolicyName,
  MembershipRole,
  PolicyContext,
  PolicyEvaluator,
} from '@solidarianid/security/core';

const COMMUNITY_MEMBERSHIP_POLICIES: ReadonlySet<CommunityMembershipPolicyName> = new Set([
  'community.member',
  'community.creator',
  'community.member_or_creator',
]);

export class CommunityMembershipPolicyEvaluator implements PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean {
    return COMMUNITY_MEMBERSHIP_POLICIES.has(meta.policy as CommunityMembershipPolicyName);
  }

  evaluate(meta: AuthorizationMetadata, context: PolicyContext): boolean {
    const role = context.resolvedRole;

    if (!role) {
      return false;
    }

    if (meta.policy === 'community.member') {
      return role === MembershipRole.MEMBER || role === MembershipRole.CREATOR;
    }

    if (meta.policy === 'community.creator') {
      return role === MembershipRole.CREATOR;
    }

    if (meta.policy === 'community.member_or_creator') {
      return role === MembershipRole.MEMBER || role === MembershipRole.CREATOR;
    }

    return false;
  }
}
