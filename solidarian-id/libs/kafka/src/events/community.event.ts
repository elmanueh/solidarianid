import { EventType } from '../events.enum';
import { GenericEvent } from './generic.event';
import { CommunityMemberJoinedEventDto } from '../dtos/communities/community-member-joined.event.dto';
import { CommunityCreatedEventDto } from '../dtos/communities/community-created.event.dto';

export type CommunityEventDto = CommunityCreatedEventDto | CommunityMemberJoinedEventDto;

/**
 * Domain event for community-updated operations.
 * Supports CommunityMemberJoinedEventDto.
 */
export class CommunityEvent extends GenericEvent<CommunityEventDto> {
  constructor(eventType: EventType, data: CommunityEventDto) {
    super(eventType, data);
  }
}
