import { Cause } from '@app/communities/domain/model/entities/cause';
import { Injectable } from '@nestjs/common';
import { EventType, Mapper } from '@solidarianid/kafka';

export class CauseEventDto {
  id: string;
  name: string;
  description: string;
  initialDate: string;
  durationDays: number;
  ods: number[];
  communityId: string;
  userIds: string[];
  eventType?: EventType;
}

@Injectable()
export class CauseEventMapper extends Mapper<Cause, CauseEventDto> {
  toDto(cause: Cause, eventType?: EventType): CauseEventDto {
    const dto = new CauseEventDto();
    dto.id = cause.id.value;
    dto.name = cause.name;
    dto.description = cause.description;
    dto.initialDate = cause.initialDate.toISOString();
    dto.durationDays = cause.durationDays;
    dto.ods = cause.ods;
    dto.communityId = cause.communityId;
    dto.userIds = cause.userIds;
    dto.eventType = eventType;
    return dto;
  }
}
