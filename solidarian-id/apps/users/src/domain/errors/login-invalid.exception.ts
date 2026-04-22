import { AuthError } from '@app/ddd/errors/auth-error';

export class LoginInvalidException extends AuthError {
  constructor(message: string = 'Invalid credentials.') {
    super(message);
    this.name = 'LoginInvalidException';
  }
}
