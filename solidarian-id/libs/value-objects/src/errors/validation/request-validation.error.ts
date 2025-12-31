import { DomainError } from '@app/ddd/errors/domain-error';

export class RequestError extends DomainError {
  constructor(message: string = 'The request is invalid') {
    super(message);
    this.name = RequestError.name;
  }
}
