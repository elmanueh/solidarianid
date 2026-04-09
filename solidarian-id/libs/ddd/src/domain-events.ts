import { Injectable } from '@nestjs/common';
import { DomainEvent } from './domain-event';

@Injectable()
export class DomainEvents {
  private readonly handlers: Map<string, ((event: DomainEvent) => void)[]> = new Map();
  private readonly globalHandlers: ((event: DomainEvent) => void)[] = [];

  register<T extends DomainEvent>(eventName: string, handler: (event: T) => void) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  registerGlobal(handler: (event: DomainEvent) => void) {
    this.globalHandlers.push(handler);
  }

  dispatch(events: DomainEvent[]) {
    for (const event of events) {
      this.globalHandlers.forEach(handler => handler(event));
      const handlers = this.handlers.get(event.type) || [];
      handlers.forEach(handler => handler(event));
    }
  }
}
