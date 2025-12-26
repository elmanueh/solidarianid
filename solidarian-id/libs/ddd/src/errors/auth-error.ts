import { DomainError } from '@app/ddd/errors/domain-error';

export class AuthError extends DomainError {
  constructor(message: string = 'Authentication error occurred.') {
    super(message);
    this.name = 'AuthError';
  }
}
