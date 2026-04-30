import { MembershipRole } from '../constants/membership-role.enum';
import { AuthorizationMetadata } from './authorization-metadata';

export interface PolicyContext {
  subject: { sub: string; jti?: string };
  resolvedEntityId?: string;
  resolvedCommunityId?: string;
  resolvedRole?: MembershipRole | null;
}

export interface PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean;
  evaluate(meta: AuthorizationMetadata, context: PolicyContext): boolean | Promise<boolean>;
}
