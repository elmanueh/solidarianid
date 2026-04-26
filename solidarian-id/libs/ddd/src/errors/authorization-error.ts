import { DomainError } from '@app/ddd/errors/domain-error';

export class AuthorizationError extends DomainError {
  constructor(message: string = 'Authorization error occurred.') {
    super(message);
    this.name = AuthorizationError.name;
  }
}
