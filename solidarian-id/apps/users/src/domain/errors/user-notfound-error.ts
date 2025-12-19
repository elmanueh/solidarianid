import { DomainError } from '@app/ddd/domain-error';

export class UserNotFoundError extends DomainError {
  constructor(message: string = 'The provided ID does not match to any user.') {
    super(message);
    this.name = 'InvalidCityError';
  }
}
