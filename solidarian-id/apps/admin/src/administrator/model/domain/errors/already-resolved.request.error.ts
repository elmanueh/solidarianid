import { ConflictError } from '@app/ddd/errors/conflict-error';

export class RequestAlreadyResolvedError extends ConflictError {
  constructor(requestId: string) {
    super(`The request with ID ${requestId} has already been resolved.`);
    this.name = RequestAlreadyResolvedError.name;
  }
}
