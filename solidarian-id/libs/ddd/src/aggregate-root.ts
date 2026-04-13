import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: DomainEvent[] = [];

  protected constructor(props: T, id?: UniqueEntityID) {
    super(props, id);
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }
}
