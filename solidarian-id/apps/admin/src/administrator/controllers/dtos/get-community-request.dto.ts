import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
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

export class CauseRequestResponseDto {
  static toDto(request: CauseRequest): CauseRequestResponseDto {
    return {
      id: request.id.value,
      type: RequestType.CAUSE,
      date: new Date().toISOString(),
      state: request.status,

      name: request.name,
      description: request.description,

      action_requests: request.actions.map(action => ActionRequestResponseDto.toDto(action)),
    };
  }
}

export class ActionRequestResponseDto {
  static toDto(request: ActionRequest): ActionRequestResponseDto {
    return {
      id: request.id.value,
      type: RequestType.ACTION,
      date: new Date().toISOString(),
      state: request.status,

      name: request.name,
      description: request.description,
    };
  }
}
