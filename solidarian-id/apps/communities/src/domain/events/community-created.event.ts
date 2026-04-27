import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitiesDomainEvent } from './domain-event';

export class CommunityCreatedEvent implements CommunitiesDomainEvent {
  readonly eventName = 'COMMUNITY_CREATED';
  readonly occurredOn = new Date();
  readonly id: string;

  constructor(readonly community: Community) {
    this.id = community.id.value;
  }
}
