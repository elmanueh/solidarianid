import { DomainError } from '@app/ddd/domain-error';

export class RepositoryError extends DomainError {
  constructor(message: string = 'The users DB suffered an unexpected error.') {
    super(message);
    this.name = 'InvalidCityError';
  }
}
