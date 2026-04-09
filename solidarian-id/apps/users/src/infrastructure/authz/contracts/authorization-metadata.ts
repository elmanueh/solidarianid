import { Action } from '@app/users/infrastructure/authz/constants/action.enum';
import { Resource } from '@app/users/infrastructure/authz/constants/resource.enum';

export type AuthorizationMetadata = {
  action: Action;
  resource: Resource;
  policy?: string;
};
