import { Action } from '@app/communities/domain/model/entities/action';
import { Event } from '@app/communities/domain/model/entities/event';
import { Objective } from '@app/communities/domain/model/value-objects/objective';
import { Injectable } from '@nestjs/common';
import { Action as ActionGraphql, Event as EventGraphql, Objective as ObjectiveGraphql } from '../entities/action';

@Injectable()
export class ActionsGraphqlMapper {
  static toActionFromDomain(action: Action): ActionGraphql {
    return {
      id: action.id.value,
      name: action.name,
      description: action.description,
      objectives: action.objectives.map(objective => ActionsGraphqlMapper.toObjectiveFromDomain(objective)),
      events: action.events.map(event => ActionsGraphqlMapper.toEventFromDomain(event)),
      causeId: action.causeId,
    };
  }

  static toEventFromDomain(event: Event): EventGraphql {
    return {
      id: event.id.value,
      name: event.name,
      description: event.description,
      initialDate: event.initialDate,
      place: {
        direction: event.place.direction,
        city: event.place.city,
        countryCode: event.place.countryCode,
      },
      assistantIds: event.assistants.map(assistant => assistant.id.value),
    };
  }

  static toObjectiveFromDomain(objective: Objective): ObjectiveGraphql {
    return {
      name: objective.name,
      description: objective.description,
      unit: objective.unit,
      quantity: objective.quantity,
      currentAmount: objective.currentAmount,
    };
  }

  toAction(action: Action): ActionGraphql {
    return ActionsGraphqlMapper.toActionFromDomain(action);
  }

  toEvent(event: Event): EventGraphql {
    return ActionsGraphqlMapper.toEventFromDomain(event);
  }

  toObjective(objective: Objective): ObjectiveGraphql {
    return ActionsGraphqlMapper.toObjectiveFromDomain(objective);
  }
}
