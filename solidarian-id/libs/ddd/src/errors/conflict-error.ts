import { DomainError } from '@app/ddd/errors/domain-error';

export class ConflictError extends DomainError {
  constructor(message: string = 'An account already exists for this data.') {
    super(message);
    this.name = 'ConflictError';
  }
}
