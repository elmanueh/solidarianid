import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { Event } from '@app/communities/shared/domain/model/entities/event';
import { Objective } from '@app/communities/shared/domain/model/value-objects/objective';
import { Injectable } from '@nestjs/common';
import { EventType, Mapper } from '@solidarianid/kafka';

export class ActionEventPlaceDto {
  direction: string;
  city: string;
  countryCode: string;
}

export class ActionEventEventDto {
  id: string;
  name: string;
  description: string;
  initialDate: string;
  place: ActionEventPlaceDto;
}

export class ActionEventObjectiveDto {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  currentAmount: number;
}

export class ActionEventDto {
  id: string;
  name: string;
  description: string;
  causeId: string;
  objectives: ActionEventObjectiveDto[];
  events: ActionEventEventDto[];
  eventType?: EventType;
}

@Injectable()
export class ActionEventMapper extends Mapper<Action, ActionEventDto> {
  toDto(action: Action, eventType?: EventType): ActionEventDto {
    const dto = new ActionEventDto();
    dto.id = action.id.value;
    dto.name = action.name;
    dto.description = action.description;
    dto.causeId = action.causeId;
    dto.objectives = action.objectives.map(objective => this.toObjectiveDto(objective));
    dto.events = action.events.map(event => this.toEventDto(event));
    dto.eventType = eventType;
    return dto;
  }

  private toObjectiveDto(objective: Objective): ActionEventObjectiveDto {
    return {
      name: objective.name,
      description: objective.description,
      quantity: objective.quantity,
      unit: objective.unit,
      currentAmount: objective.currentAmount,
    };
  }

  private toEventDto(event: Event): ActionEventEventDto {
    return {
      id: event.id.value,
      name: event.name,
      description: event.description,
      initialDate: event.initialDate.toISOString(),
      place: {
        direction: event.place.direction,
        city: event.place.city,
        countryCode: event.place.countryCode,
      },
    };
  }
}
