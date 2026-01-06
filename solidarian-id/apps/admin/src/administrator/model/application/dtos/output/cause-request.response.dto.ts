import { ActionRequestResponseDto } from '@app/admin/administrator/model/application/dtos/output/action-request.response.dto';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';

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
