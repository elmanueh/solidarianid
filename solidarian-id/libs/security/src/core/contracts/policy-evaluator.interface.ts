import { MembershipRole } from '../constants/membership-role.enum';
import { AuthorizationMetadata } from './authorization-metadata';

export interface PolicyContext {
  subject: { sub: string; jti?: string };
  resolvedCommunityId?: string;
  resolvedRole?: MembershipRole | null;
  params: Record<string, string | undefined>;
  body?: unknown;
}

export interface PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean;
  evaluate(meta: AuthorizationMetadata, context: PolicyContext): boolean | Promise<boolean>;
}
