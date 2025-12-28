import { ConflictError } from '@app/ddd/errors/conflict-error';

export class AdminConflictError extends ConflictError {
  constructor(message: string) {
    super(message);
  }
}
