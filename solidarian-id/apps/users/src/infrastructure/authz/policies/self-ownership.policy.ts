import { Resource } from '@app/users/infrastructure/authz/constants';
import { AuthorizationMetadata, PolicyContext, PolicyEvaluator } from '@app/users/infrastructure/authz/contracts';
import { Injectable } from '@nestjs/common';

const SELF_POLICY_NAME = 'self';

@Injectable()
export class SelfOwnershipPolicy implements PolicyEvaluator {
  supports(meta: AuthorizationMetadata): boolean {
    return meta.resource === Resource.USER && meta.policy === SELF_POLICY_NAME;
  }

  evaluate(_meta: AuthorizationMetadata, context: PolicyContext): boolean {
    const requestedUserId = context.params.id;

    if (!requestedUserId || !context.subject.sub) {
      return false;
    }

    return context.subject.sub === requestedUserId;
  }
}
