import { Action } from '@app/communities/domain/model/entities/action';
import { Injectable } from '@nestjs/common';
import { Action as ActionGraphql, Event as EventGraphql, Objective as ObjectiveGraphql } from '../entities/action';

@Injectable()
export class ActionsGraphqlMapper {
  toAction(action: Action): ActionGraphql {
    return {
      id: action.id.value,
      name: action.name,
      description: action.description,
      objectives: action.objectives.map(objective => this.toObjective(objective)),
      events: action.events.map(event => this.toEvent(event)),
      causeId: action.causeId,
    };
  }

  toEvent(event: Action['events'][number]): EventGraphql {
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
    };
  }

  toObjective(objective: Action['objectives'][number]): ObjectiveGraphql {
    return {
      name: objective.name,
      description: objective.description,
      unit: objective.unit,
      quantity: objective.quantity,
      currentAmount: objective.currentAmount,
    };
  }
}
