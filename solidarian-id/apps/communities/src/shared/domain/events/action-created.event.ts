import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { DomainEvent } from '@app/ddd/domain-event';

export class ActionCreatedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = ActionCreatedEvent.name;
  readonly id: string;

  constructor(readonly action: Action) {
    this.id = action.id.value;
  }
}
