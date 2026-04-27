import { CommunityCreatedEvent } from '@app/communities/domain/events/community-created.event';
import { CommunityMemberJoinedEvent } from '@app/communities/domain/events/community-member-joined.event';
import { CommunitiesPublisherPort } from '@app/communities/domain/ports/communities.publisher.port';
import { DomainEvent } from '@app/ddd/domain-event';
import { DomainEvents } from '@app/ddd/domain-events';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class CommunitiesHandlerDispatcher implements OnModuleInit {
  constructor(
    private readonly domainEventRegister: DomainEvents,
    private readonly communitiesPublisher: CommunitiesPublisherPort,
  ) {}

  onModuleInit(): void {
    this.domainEventRegister.register(CommunityCreatedEvent.name, event => this.handleEvent(event));
    this.domainEventRegister.register(CommunityMemberJoinedEvent.name, event => this.handleEvent(event));
  }

  handleEvent(event: DomainEvent): void {
    switch (event.type) {
      case CommunityCreatedEvent.name:
        void this.communitiesPublisher.publish(EventType.COMMUNITY_CREATED, (event as CommunityCreatedEvent).community);
        break;
      case CommunityMemberJoinedEvent.name:
        void this.communitiesPublisher.publish(
          EventType.COMMUNITY_MEMBER_JOINED,
          (event as CommunityMemberJoinedEvent).community,
        );
        break;
      default:
        console.warn(`No handler for event type ${event.type}`);
    }
  }
}
