import { DomainEvent } from '@app/ddd/domain-event';
import { EventType } from '../events.enum';

export class GenericEvent<TDto> implements DomainEvent {
  readonly occurredOn: Date;
  readonly eventType: EventType;
  readonly data: TDto;

  constructor(eventType: EventType, data: TDto) {
    this.occurredOn = new Date();
    this.eventType = eventType;
    this.data = data;
  }
}
