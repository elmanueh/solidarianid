import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';

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
