import {
  AuthorizationMetadata,
  CommunityMembershipPolicy,
  isCommunityMembershipPolicy,
  MembershipRole,
  PolicyContext,
  PolicyEvaluator,
} from '@solidarianid/security/core';

export class CommunityMembershipPolicyEvaluator implements PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean {
    return isCommunityMembershipPolicy(meta.policy);
  }

  evaluate(meta: AuthorizationMetadata, context: PolicyContext): boolean {
    const role = context.resolvedRole;

    if (!role) {
      return false;
    }

    if (meta.policy === CommunityMembershipPolicy.MEMBER_OR_CREATOR) {
      return role === MembershipRole.MEMBER || role === MembershipRole.CREATOR;
    }

    if (meta.policy === CommunityMembershipPolicy.MEMBER_ONLY) {
      return role === MembershipRole.MEMBER;
    }

    if (meta.policy === CommunityMembershipPolicy.CREATOR_ONLY) {
      return role === MembershipRole.CREATOR;
    }

    return false;
  }
}
