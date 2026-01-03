import { DomainError } from '@app/ddd/errors/domain-error';

export class RequestError extends DomainError {
  constructor(requestId: string) {
    super(`There was an error processing the request with ID ${requestId}.`);
    this.name = RequestError.name;
  }
}
