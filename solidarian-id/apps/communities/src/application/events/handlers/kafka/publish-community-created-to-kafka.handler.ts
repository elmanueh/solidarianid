import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { CommunityCreatedEvent } from '@app/communities/domain/events/community-created.event';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { Injectable } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class PublishCommunityCreatedToKafkaHandler implements DomainEventHandler<CommunityCreatedEvent> {
  constructor(private readonly communitiesPublisher: CommunitiesPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is CommunityCreatedEvent {
    return event instanceof CommunityCreatedEvent;
  }

  async handle(event: CommunityCreatedEvent): Promise<void> {
    await this.communitiesPublisher.publish(EventType.COMMUNITY_CREATED, event.community);
  }
}
