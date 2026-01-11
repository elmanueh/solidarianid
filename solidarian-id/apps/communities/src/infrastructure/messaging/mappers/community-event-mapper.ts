import { Community } from '@app/communities/domain/model/aggregates/community';
import { Injectable } from '@nestjs/common';
import {
  CommunityMemberJoinedEventDto,
  CommunityCreatedEventDto,
  CommunityEventDto,
  EventType,
  Mapper,
} from '@solidarianid/kafka';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

@Injectable()
export class CommunityEventMapper extends Mapper<Community, CommunityEventDto> {
  toDto(community: Community, eventType?: EventType): CommunityEventDto {
    switch (eventType) {
      case EventType.COMMUNITY_CREATED:
        return this.toCommunityCreatedDto(community);

      case EventType.COMMUNITY_MEMBER_JOINED:
        return this.toCommunityMemberJoinedDto(community);

      default:
        throw new ValidationError(`Unknown community event type: ${eventType}`);
    }
  }

  private toCommunityCreatedDto(community: Community): CommunityCreatedEventDto {
    const dto = new CommunityCreatedEventDto();
    dto.id = community.id.value;
    dto.name = community.name;
    dto.description = community.description;
    dto.creatorId = community.creator.id.value;
    return dto;
  }

  private toCommunityMemberJoinedDto(community: Community): CommunityMemberJoinedEventDto {
    const dto = new CommunityMemberJoinedEventDto();
    dto.communityId = community.id.value;
    dto.joinedAt = new Date();
    dto.communityName = community.name;
    const lastMember = community.members[community.members.length - 1];
    dto.userId = lastMember.id.value;
    return dto;
  }
}
