import { Action } from '@app/communities/domain/model/entities/action';
import { Mapper } from '@app/ddd/repository/mapper';
import { Injectable } from '@nestjs/common';
import { ActionEntity } from '../entities/action.entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { EventEntityMapper } from './event-entity.mapper';
import { Either, left, sequence } from '@app/ddd/either';
import { ObjectiveEntityMapper } from './objetive-entity.mapper';

@Injectable()
export class ActionEntityMapper implements Mapper<Action, ActionEntity> {
  constructor(
    private readonly eventEntityMapper: EventEntityMapper,
    private readonly objetiveEntityMapper: ObjectiveEntityMapper,
  ) {}
  toPersistence(model: Action): ActionEntity {
    const entity = new ActionEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;
    entity.causeId = model.causeId;

    entity.events = model.events?.map((event) =>
      this.eventEntityMapper.toPersistence(event),
    );

    entity.objectives = model.objectives?.map((objective) =>
      this.objetiveEntityMapper.toPersistence(objective),
    );

    return entity;
  }

  fromPersistence(entity: ActionEntity): Either<ValidationError, Action> {
    const eventsOrError = sequence(
      entity.events?.map((eventEntity) =>
        this.eventEntityMapper.fromPersistence(eventEntity),
      ),
    );

    if (eventsOrError.isLeft()) {
      return left(eventsOrError.value);
    }

    const objectivesOrError = sequence(
      entity.objectives?.map((objectiveEntity) =>
        this.objetiveEntityMapper.fromPersistence(objectiveEntity),
      ),
    );

    if (objectivesOrError.isLeft()) {
      return left(objectivesOrError.value);
    }
    return Action.create(
      {
        name: entity.name,
        description: entity.description,
        causeId: entity.causeId,
        events: eventsOrError.value,
        objectives: objectivesOrError.value,
      },
      entity.id,
    );
  }
}
