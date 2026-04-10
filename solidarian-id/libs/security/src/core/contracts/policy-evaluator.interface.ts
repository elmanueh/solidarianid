import { AuthorizationMetadata } from './authorization-metadata';

export interface PolicyContext {
  subject: { sub: string; jti?: string };
  params: Record<string, string | undefined>;
  body?: unknown;
}

export interface PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean;
  evaluate(meta: AuthorizationMetadata, context: PolicyContext): boolean | Promise<boolean>;
}
