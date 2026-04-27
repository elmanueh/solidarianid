import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { RealtimeNotificationsPublisherPort } from '@app/communities/domain/ports/realtime-notifications.publisher.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublishCauseCreatedToGraphqlHandler implements DomainEventHandler<CauseCreatedEvent> {
  constructor(private readonly realtimePublisher: RealtimeNotificationsPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is CauseCreatedEvent {
    return event instanceof CauseCreatedEvent;
  }

  async handle(event: CauseCreatedEvent): Promise<void> {
    await this.realtimePublisher.publishCauseCreated(event);
  }
}
