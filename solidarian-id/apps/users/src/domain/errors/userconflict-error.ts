import { ConflictError } from '@app/ddd/errors/conflict-error';

export class UserConflictError extends ConflictError {
  constructor(message: string = 'An account already exists for this data.') {
    super(message);
    this.name = 'UserConflictError';
  }
}
