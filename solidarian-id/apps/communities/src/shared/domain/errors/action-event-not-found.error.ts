import { DomainError } from '@app/ddd/errors/domain-error';

export class ActionEventNotFoundError extends DomainError {
  constructor(eventId: string, actionId: string) {
    super(`Event with ID ${eventId} was not found in action ${actionId}.`);
    this.name = ActionEventNotFoundError.name;
  }
}
