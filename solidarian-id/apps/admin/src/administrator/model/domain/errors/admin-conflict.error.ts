import { AuthError } from './auth.error';

export class AdminConflictError extends AuthError {
  constructor(message: string) {
    super(message);
  }
}
