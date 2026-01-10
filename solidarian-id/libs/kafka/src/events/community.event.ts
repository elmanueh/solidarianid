import { EventType } from '../events.enum';
import { GenericEvent } from './generic.event';
import { CommunityMemberJoinedEventDto } from '../dtos/communities/community-member-joined.event.dto';
import { CommunityCreatedDto } from '../dtos/communities/community-created.event.dto';

export type CommunityEventDto = CommunityCreatedDto | CommunityMemberJoinedEventDto;

/**
 * Domain event for community-updated operations.
 * Supports CommunityMemberJoinedEventDto.
 */
export class CommunityEvent extends GenericEvent<CommunityEventDto> {
  constructor(eventType: EventType, data: CommunityEventDto) {
    super(eventType, data);
  }
}
