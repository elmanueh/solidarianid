import { Cause } from '@app/communities/shared/domain/model/aggregates/cause';
import { DomainEvent } from '@app/ddd/domain-event';

export class CauseCreatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = CauseCreatedEvent.name;
  public readonly id: string;

  constructor(readonly cause: Cause) {
    this.id = cause.id.value;
  }
}
