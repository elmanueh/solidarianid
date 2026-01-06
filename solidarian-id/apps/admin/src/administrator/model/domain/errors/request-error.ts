import { DomainError } from '@app/ddd/errors/domain-error';

export class RequestError extends DomainError {
  constructor(message: string, requestId?: string) {
    const requestInfo = requestId ? ` for request ID ${requestId}` : '';
    super(`Request error${requestInfo}: ${message}`);
    this.name = RequestError.name;
  }
}
