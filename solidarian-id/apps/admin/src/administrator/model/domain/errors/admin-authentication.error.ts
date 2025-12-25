import { AuthError } from './auth.error';

export class AdminAuthenticationError extends AuthError {
  constructor(message: string) {
    super(message);
  }
}
