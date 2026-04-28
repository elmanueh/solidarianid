import { DomainError } from '@app/ddd/errors/domain-error';

export class EventAlreadyOccurredError extends DomainError {
  constructor(message: string = 'Cannot modify attendance because the event has already occurred.') {
    super(message);
    this.name = EventAlreadyOccurredError.name;
  }
}
