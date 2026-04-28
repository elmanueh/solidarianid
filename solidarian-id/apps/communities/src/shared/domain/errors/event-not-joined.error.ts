import { DomainError } from '@app/ddd/errors/domain-error';

export class EventNotJoinedError extends DomainError {
  constructor(message: string = 'User is not joined to this event.') {
    super(message);
    this.name = EventNotJoinedError.name;
  }
}
