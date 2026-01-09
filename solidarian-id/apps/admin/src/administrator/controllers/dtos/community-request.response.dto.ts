import { CauseRequestResponseDto } from '@app/admin/administrator/controllers/dtos/cause-request.response.dto';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';

export class CommunityRequestResponseDto {
  static toDto(request: CommunityRequest): CommunityRequestResponseDto {
    return {
      id: request.id.value,
      type: RequestType.COMMUNITY,
      date: new Date().toISOString(),
      state: request.status,

      name: request.name,
      description: request.description,

      cause_requests: request.causes.map(cause => CauseRequestResponseDto.toDto(cause)),
    };
  }
}
