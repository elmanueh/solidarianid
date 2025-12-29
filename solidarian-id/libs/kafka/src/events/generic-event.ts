import { DomainEvent } from '@app/ddd/domain-event';
import { EventType } from '../events.enum';
import { Entity } from '@app/ddd/entity';

export class GenericEvent implements DomainEvent {
  occurredOn: Date;
  private readonly eventType: EventType;
  private readonly entity: Entity<any>;

  private constructor(eventType: EventType, entity: Entity<any>) {
    this.eventType = eventType;
    this.entity = entity;
    this.occurredOn = new Date();
  }

  public static create(
    eventType: EventType,
    entity: Entity<any>,
  ): GenericEvent {
    return new GenericEvent(eventType, entity);
  }

  get _eventType(): EventType {
    return this.eventType;
  }

  get _entity(): Entity<any> {
    return this.entity;
  }
}
