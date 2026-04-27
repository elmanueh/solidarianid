import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublishRequestStatusChangedToGraphqlHandler implements DomainEventHandler<RequestStatusChangedEvent> {
  constructor(private readonly realtimePublisher: RealtimeNotificationsPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is RequestStatusChangedEvent {
    return event instanceof RequestStatusChangedEvent;
  }

  async handle(event: RequestStatusChangedEvent): Promise<void> {
    await this.realtimePublisher.publishRequestStatusChanged(event);
  }
}
