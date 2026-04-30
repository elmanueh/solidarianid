import { Community } from '@app/communities/shared/domain/model/aggregates/community';
import { DomainEvent } from '@app/ddd/domain-event';

export class CommunityCreatedEvent implements DomainEvent {
  readonly occurredOn = new Date();
  readonly type = CommunityCreatedEvent.name;
  readonly id: string;

  constructor(readonly community: Community) {
    this.id = community.id.value;
  }
}
