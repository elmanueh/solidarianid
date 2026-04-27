import { CommunityMemberJoinedEvent } from '@app/communities/domain/events/community-member-joined.event';
import { CommunitiesDomainEvent } from '@app/communities/domain/events/domain-event';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';
import { DomainEventHandler } from '@app/communities/domain/ports/domain-event-bus.port';
import { Injectable } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class PublishCommunityMemberJoinedToKafkaHandler implements DomainEventHandler<CommunityMemberJoinedEvent> {
  constructor(private readonly communitiesPublisher: CommunitiesPublisherPort) {}

  canHandle(event: CommunitiesDomainEvent): event is CommunityMemberJoinedEvent {
    return event instanceof CommunityMemberJoinedEvent;
  }

  async handle(event: CommunityMemberJoinedEvent): Promise<void> {
    await this.communitiesPublisher.publish(EventType.COMMUNITY_MEMBER_JOINED, event.community);
  }
}
