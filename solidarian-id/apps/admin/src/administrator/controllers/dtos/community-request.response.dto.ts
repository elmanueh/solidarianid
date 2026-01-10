import { CauseRequestResponseDto } from '@app/admin/administrator/controllers/dtos/cause-request.response.dto';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';

export class CommunityRequestResponseDto {
  static toDto(community: CommunityRequest): CommunityRequestResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
      date: community.createdAt,

      causeRequests: community.causes.map(cause => CauseRequestResponseDto.toDto(cause)),
    };
  }
}
