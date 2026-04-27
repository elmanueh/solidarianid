import { Cause } from '@app/communities/domain/model/entities/cause';
import { CommunitiesDomainEvent } from './domain-event';

export class CauseCreatedEvent implements CommunitiesDomainEvent {
  readonly eventName = 'CAUSE_CREATED';
  readonly occurredOn = new Date();
  readonly id: string;

  constructor(readonly cause: Cause) {
    this.id = cause.id.value;
  }
}
