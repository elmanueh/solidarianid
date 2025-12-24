import { DomainEvent } from './domain-event';

export class DomainEvents {
  private static readonly handlers: Map<
    string,
    ((event: DomainEvent) => void)[]
  > = new Map();

  static register<T extends DomainEvent>(
    eventName: string,
    handler: (event: T) => void,
  ) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler as (event: DomainEvent) => void);
  }

  static dispatch(events: DomainEvent[]) {
    for (const event of events) {
      const handlers = this.handlers.get(event.constructor.name) || [];
      handlers.forEach((handler) => handler(event));
    }
  }
}
