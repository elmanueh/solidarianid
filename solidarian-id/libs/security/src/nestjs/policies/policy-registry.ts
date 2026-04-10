import { AuthorizationMetadata, PolicyContext, PolicyEvaluator } from '@solidarianid/security/core';
import { Inject, Injectable } from '@nestjs/common';

export const AUTHZ_POLICY_EVALUATORS = Symbol('AUTHZ_POLICY_EVALUATORS');

@Injectable()
export class PolicyRegistry {
  constructor(@Inject(AUTHZ_POLICY_EVALUATORS) private readonly evaluators: PolicyEvaluator[]) {}

  async evaluate(meta: AuthorizationMetadata, context: PolicyContext): Promise<boolean> {
    const evaluator = this.evaluators.find(candidate => candidate.supports(meta));

    if (!evaluator) {
      return false;
    }

    return Promise.resolve(evaluator.evaluate(meta, context));
  }
}
