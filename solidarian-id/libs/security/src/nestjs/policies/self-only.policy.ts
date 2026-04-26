import {
  AuthorizationMetadata,
  PolicyContext,
  PolicyEvaluator,
  Resource,
  isCommunityMembershipPolicy,
} from '@solidarianid/security/core';

export class SelfOnlyPolicyEvaluator implements PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean {
    return meta.resource === Resource.USER && !isCommunityMembershipPolicy(meta.policy);
  }

  evaluate(_meta: AuthorizationMetadata, context: PolicyContext): boolean {
    const actorId = context.subject.sub;
    const targetUserId = context.resolvedEntityId;

    if (!actorId || !targetUserId) {
      return false;
    }

    return actorId === targetUserId;
  }
}
