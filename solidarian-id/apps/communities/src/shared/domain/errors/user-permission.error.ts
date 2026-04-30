import { AuthorizationError } from '@app/ddd/errors/authorization-error';

export class UserPermissionError extends AuthorizationError {
  constructor(message: string = 'User does not have the required permissions.') {
    super(message);
    this.name = UserPermissionError.name;
  }
}
