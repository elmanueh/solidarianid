import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { DomainEventBusPort, DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { Inject, Injectable } from '@nestjs/common';

export const DOMAIN_EVENT_HANDLERS = Symbol('DOMAIN_EVENT_HANDLERS');

@Injectable()
export class DomainEventDispatcher extends DomainEventBusPort {
  constructor(@Inject(DOMAIN_EVENT_HANDLERS) private readonly handlers: DomainEventHandler[]) {
    super();
  }

  async publish(event: CommunitiesDomainEvent): Promise<void> {
    const handlers = this.handlers.filter(handler => handler.canHandle(event));

    await Promise.all(handlers.map(handler => handler.handle(event)));
  }
}
