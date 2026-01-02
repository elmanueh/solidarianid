import { ActionRequest } from '@app/admin/administrator/model/domain/models/action.request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause.request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community.request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Injectable } from '@nestjs/common';
import {
  Mapper,
  RequestEventDto,
  CommunityRequestEventDto,
  CauseRequestEventDto,
  ActionRequestEventDto,
} from '@solidarianid/kafka';

@Injectable()
export class RequestEventMapper extends Mapper<Request<any>, RequestEventDto> {
  toDto(request: CommunityRequest | CauseRequest | ActionRequest): RequestEventDto {
    if (request instanceof CommunityRequest) {
      const dto = new CommunityRequestEventDto();
      dto.id = request.id.value;
      dto.status = request.status;
      dto.reason = request.reason;
      return dto;
    } else if (request instanceof CauseRequest) {
      const dto = new CauseRequestEventDto();
      dto.id = request.id.value;
      dto.status = request.status;
      dto.reason = request.reason;
      return dto;
    } else if (request instanceof ActionRequest) {
      const dto = new ActionRequestEventDto();
      dto.id = request.id.value;
      dto.status = request.status;
      dto.reason = request.reason;
      return dto;
    }
    throw new Error('Unknown request type');
  }
}
