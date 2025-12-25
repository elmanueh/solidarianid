import { DomainError } from '@app/ddd/errors/domain-error';

export class RequestAlreadyResolvedException extends DomainError {
  constructor(requestId: string) {
    super(`The request with ID ${requestId} has already been resolved.`);
    this.name = RequestAlreadyResolvedException.name;
  }
}
