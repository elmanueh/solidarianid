import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { Injectable } from '@nestjs/common';
import {
  ActionRequestEventDto,
  CauseRequestEventDto,
  CommunityRequestEventDto,
  Mapper,
  RequestEventDto,
} from '@solidarianid/kafka';
type AnyRequest = CommunityRequest | CauseRequest | ActionRequest;

@Injectable()
export class RequestEventMapper extends Mapper<Request<any>, RequestEventDto> {
  toDto(request: AnyRequest): RequestEventDto {
    if (request instanceof CommunityRequest) return this.mapCommunity(request);
    if (request instanceof CauseRequest) return this.mapCause(request);
    if (request instanceof ActionRequest) return this.mapAction(request);

    throw new Error('Unsupported request type');
  }

  private fillBase<T extends RequestEventDto>(dto: T, request: AnyRequest): T {
    dto.id = request.id.value;
    dto.name = request.name;
    dto.description = request.description;
    dto.status = request.status;
    dto.reason = request.reason;
    dto.userId = request.userId;
    return dto;
  }

  private mapCommunity(request: CommunityRequest): CommunityRequestEventDto {
    const dto = this.fillBase(new CommunityRequestEventDto(), request);

    dto.causeRequests = request.causes.map(cause => ({
      name: cause.name,
      description: cause.description,
      status: cause.status,
      ods: [...cause.ods],
      initialDate: cause.startDate,
      durationDays: cause.duration,
    }));

    return dto;
  }

  private mapCause(request: CauseRequest): CauseRequestEventDto {
    const dto = this.fillBase(new CauseRequestEventDto(), request);

    dto.communityId = request.communityId;
    dto.ods = [...request.ods];
    dto.initialDate = request.startDate;
    dto.durationDays = request.duration;

    return dto;
  }

  private mapAction(request: ActionRequest): ActionRequestEventDto {
    const dto = this.fillBase(new ActionRequestEventDto(), request);

    dto.causeId = request.causeId;
    dto.objectives = request.objectives.map(o => ({
      name: o.name,
      description: o.description,
      quantity: o.quantity,
      unit: o.unit,
    }));

    dto.events = request.events.map(e => ({
      name: e.name,
      description: e.description,
      initialDate: e.initialDate,
      place: {
        direction: e.place.direction,
        city: e.place.city,
        countryCode: e.place.countryCode,
      },
    }));

    return dto;
  }
}
