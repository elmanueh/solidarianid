import { DomainError } from '@app/ddd/errors/domain-error';

export class EventAlreadyJoinedError extends DomainError {
  constructor(message: string = 'User is already joined to this event.') {
    super(message);
    this.name = EventAlreadyJoinedError.name;
  }
}
