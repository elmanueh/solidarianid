import { AuthError } from '@app/ddd/errors/auth-error';

export class AdminAuthenticationError extends AuthError {
  constructor(message: string) {
    super(message);
  }
}
