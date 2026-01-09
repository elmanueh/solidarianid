import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';

export class CommunityRequestResponseDto {
  static toDto(community: CommunityRequest): CommunityRequestResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
      date: new Date().toISOString(),

      causeRequests: community.causes.map(cause => CauseRequestResponseDto.toDto(cause)),
    };
  }
}

export class CauseRequestResponseDto {
  static toDto(cause: CauseRequest): CauseRequestResponseDto {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      date: new Date().toISOString(),
      startDate: cause.startDate,
      duration: cause.duration,
      ods: [...cause.ods],
    };
  }
}

export class ActionRequestResponseDto {
  static toDto(action: ActionRequest): ActionRequestResponseDto {
    return {
      id: action.id.value,
      name: action.name,
      description: action.description,

      date: new Date().toISOString(),
      objectives: action.objectives.map(obj => ({
        name: obj.name,
        description: obj.description,
        quantity: obj.quantity,
        unit: obj.unit,
      })),
      events: action.events.map(evt => ({
        name: evt.name,
        description: evt.description,
        initialDate: evt.initialDate,
        place: evt.place,
      })),
    };
  }
}
