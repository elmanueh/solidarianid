import { DomainEvent } from './domain-event';
import { Entity } from './entity';
import { UniqueEntityID } from './unique-entity-id';

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
}
