import { Action } from '../constants/action.enum';
import { Resource } from '../constants/resource.enum';

export enum CommunityMembershipPolicy {
  MEMBER_ONLY = 'community.member_only',
  CREATOR_ONLY = 'community.creator',
  MEMBER_OR_CREATOR = 'community.member_or_creator',
}

export enum UsersPolicy {
  SELF_ONLY = 'user.self',
}

export type AuthorizationPolicy = CommunityMembershipPolicy | UsersPolicy;

export type AuthorizationMetadata = {
  action: Action;
  policy: AuthorizationPolicy;
  resource?: Resource;
  entityId?: string;
};

export function isCommunityMembershipPolicy(policy: AuthorizationPolicy): policy is CommunityMembershipPolicy {
  return Object.values(CommunityMembershipPolicy).includes(policy as CommunityMembershipPolicy);
}
