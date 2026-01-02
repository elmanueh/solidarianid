import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action.request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause.request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community.request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Injectable } from '@nestjs/common';
import { Mapper, RequestEventDto } from '@solidarianid/kafka';

@Injectable()
export class RequestEventMapper extends Mapper<Request<any>, RequestEventDto> {
  toDto(request: CommunityRequest | CauseRequest | ActionRequest): RequestEventDto {
    const dto = new RequestEventDto();
    dto.id = request.id.value;
    if (request instanceof CommunityRequest) {
      dto.type = RequestType.COMMUNITY;
    } else if (request instanceof CauseRequest) {
      dto.type = RequestType.CAUSE;
    } else if (request instanceof ActionRequest) {
      dto.type = RequestType.ACTION;
    }
    dto.status = request.status;
    dto.reason = request.reason;
    return dto;
  }
}
