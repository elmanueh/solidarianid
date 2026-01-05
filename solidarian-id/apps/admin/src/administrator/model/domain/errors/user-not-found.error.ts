import { DomainError } from '@app/ddd/errors/domain-error';

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`User with ID ${userId} not found.`);
  }
}
