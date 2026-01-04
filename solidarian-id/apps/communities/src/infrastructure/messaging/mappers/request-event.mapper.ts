import { Mapper } from '@solidarianid/kafka';
import { AnyRequest } from '@app/communities/domain/ports/requests.publisher.port';
import { RequestEventDto } from '@solidarianid/kafka';
import {
  ActionRequestEventDto,
  ActionRequestEventEventDto,
  ActionRequestObjectiveEventDto,
} from '../../../../../../libs/kafka/src/dtos/requests/request-action.event.dto';
import { CauseRequestEventDto } from '../../../../../../libs/kafka/src/dtos/requests/request-cause.event.dto';
import {
  CommunityRequestEventDto,
  CommunityRequestCauseEventDto,
} from '../../../../../../libs/kafka/src/dtos/requests/request-community.event.dto';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

/**
 * Mapper for converting domain Request entities to event DTOs.
 * Handles all three types: Community, Cause, and Action requests.
 */
@Injectable()
export class RequestEventMapper extends Mapper<AnyRequest, RequestEventDto> {
  toDto(model: AnyRequest): RequestEventDto {
    if (model instanceof CommunityRequest) {
      return this.toCommunityDto(model);
    }

    if (model instanceof CauseRequest) {
      return this.toCauseDto(model);
    }

    if (model instanceof ActionRequest) {
      return this.toActionDto(model);
    }

    throw new ValidationError(`Unknown request type: ${typeof model}`);
  }

  private toCommunityDto(model: CommunityRequest): CommunityRequestEventDto {
    const dto = new CommunityRequestEventDto();
    dto.id = model.id.value;
    dto.name = model.name;
    dto.description = model.description;
    dto.status = model.status;
    dto.reason = model.reason;
    dto.userId = model.user.id.value;
    dto.type = model.type;
    dto.causeRequests = model.causeRequests.map(cause => {
      const causeDto = new CommunityRequestCauseEventDto();
      causeDto.name = cause.name.value;
      causeDto.description = cause.description.value;
      causeDto.status = cause.status;
      causeDto.ods = [...cause.ods];
      causeDto.initialDate = cause.initialDate;
      causeDto.durationDays = cause.durationDays.value;
      return causeDto;
    });
    return dto;
  }

  private toCauseDto(model: CauseRequest): CauseRequestEventDto {
    const dto = new CauseRequestEventDto();
    dto.id = model.id.value;
    dto.name = model.name;
    dto.description = model.description;
    dto.status = model.status;
    dto.reason = model.reason;
    dto.userId = model.user.id.value;
    dto.ods = [...model.ods];
    dto.type = model.type;
    dto.initialDate = model.initialDate;
    dto.durationDays = model.durationDays.value;
    dto.communityId = model.communityId;
    return dto;
  }

  private toActionDto(model: ActionRequest): ActionRequestEventDto {
    const dto = new ActionRequestEventDto();
    dto.id = model.id.value;
    dto.name = model.name;
    dto.description = model.description;
    dto.status = model.status;
    dto.reason = model.reason;
    dto.userId = model.user.id.value;
    dto.causeId = model.causeId;
    dto.type = model.type;
    dto.objectives = model.objectives.map(obj => {
      const objDto = new ActionRequestObjectiveEventDto();
      objDto.name = obj.name.value;
      objDto.description = obj.description.value;
      objDto.quantity = obj.quantity.value;
      objDto.unit = obj.unit.value;
      return objDto;
    });
    dto.events = model.events.map(evt => {
      const evtDto = new ActionRequestEventEventDto();
      evtDto.name = evt.name;
      evtDto.description = evt.description;
      evtDto.initialDate = evt.initialDate;
      evtDto.place = {
        direction: evt.place.direction,
        city: evt.place.city,
        countryCode: evt.place.countryCode,
      };
      return evtDto;
    });
    return dto;
  }
}
