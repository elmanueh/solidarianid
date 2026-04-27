import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';

export interface DomainEventHandler<TEvent extends CommunitiesDomainEvent = CommunitiesDomainEvent> {
  canHandle(event: CommunitiesDomainEvent): event is TEvent;
  handle(event: TEvent): Promise<void>;
}

export abstract class DomainEventBusPort {
  abstract publish(event: CommunitiesDomainEvent): Promise<void>;
}
