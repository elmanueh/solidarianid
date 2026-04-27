import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublishActionCreatedToGraphqlHandler implements DomainEventHandler<ActionCreatedEvent> {
  constructor(private readonly realtimePublisher: RealtimeNotificationsPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is ActionCreatedEvent {
    return event instanceof ActionCreatedEvent;
  }

  async handle(event: ActionCreatedEvent): Promise<void> {
    await this.realtimePublisher.publishActionCreated(event);
  }
}
