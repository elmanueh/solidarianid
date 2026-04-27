import { Community } from '@app/communities/domain/model/aggregates/community';
import { DomainEvent } from '@app/ddd/domain-event';

export class CommunityMemberJoinedEvent implements DomainEvent {
  readonly occurredOn = new Date();
  readonly type = CommunityMemberJoinedEvent.name;
  readonly id: string;

  constructor(readonly community: Community) {
    this.id = community.id.value;
  }
}
