import { Action } from '../constants/action.enum';
import { Resource } from '../constants/resource.enum';

export type AuthorizationMetadata = {
  action: Action;
  resource: Resource;
  policy?: string;
};
