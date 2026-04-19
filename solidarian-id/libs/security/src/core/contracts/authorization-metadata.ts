import { Action } from '../constants/action.enum';
import { EntityType } from '../constants/entity-type.enum';
import { Resource } from '../constants/resource.enum';

export type CommunityMembershipPolicy = 'community.member' | 'community.creator' | 'community.member_or_creator';

export type AuthorizationPolicy = CommunityMembershipPolicy | (string & {});

export type EntityIdSelector = {
  source: 'params' | 'body' | 'args';
  key: string;
};

export type AuthorizationMetadata = {
  action: Action;
  resource: Resource;
  policy: AuthorizationPolicy;
  entityType?: EntityType;
  entityId?: EntityIdSelector;
};

export function isCommunityMembershipPolicy(policy: AuthorizationPolicy): policy is CommunityMembershipPolicy {
  return policy === 'community.member' || policy === 'community.creator' || policy === 'community.member_or_creator';
}
