import { Action } from '@app/communities/domain/model/entities/action';
import { CommunitiesDomainEvent } from './domain-event';

export class ActionCreatedEvent implements CommunitiesDomainEvent {
  readonly eventName = 'ACTION_CREATED';
  readonly occurredOn = new Date();
  readonly id: string;

  constructor(readonly action: Action) {
    this.id = action.id.value;
  }
}
