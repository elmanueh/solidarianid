import { ConflictError } from '@app/ddd/errors/conflict-error';

export class RequestInvalidStatusError extends ConflictError {
  constructor(message: string, requestId: string) {
    const requestInfo = requestId ? ` for request ID ${requestId}` : '';
    super(`Request invalid status error${requestInfo}: ${message}`);
    this.name = RequestInvalidStatusError.name;
  }
}
