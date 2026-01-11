import { AuthError } from '@app/ddd/errors/auth-error';

export class UserPermissionError extends AuthError {
  constructor(message: string = 'User does not have the required permissions.') {
    super(message);
    this.name = UserPermissionError.name;
  }
}
