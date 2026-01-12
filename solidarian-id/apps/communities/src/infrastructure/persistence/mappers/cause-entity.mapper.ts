import { Mapper } from '@app/ddd/repository/mapper';
import { CauseEntity } from '../entities/cause.entity';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { Either, left, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { ActionEntityMapper } from './action-entity.mapper';

@Injectable()
export class CauseEntityMapper implements Mapper<Cause, CauseEntity> {
  constructor(private readonly actionEntityMapper: ActionEntityMapper) {}
  toPersistence(model: Cause): CauseEntity {
    const entity = new CauseEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;
    entity.durationDays = model.durationDays;
    entity.ods = model.ods;
    entity.initialDate = model.initialDate;
    entity.communityId = model.communityId;

    if (model.actions && model.actions.length > 0) {
      entity.actions = model.actions.map(action => this.actionEntityMapper.toPersistence(action));
    }
    return entity;
  }
  fromPersistence(entity: CauseEntity): Either<ValidationError, Cause> {
    const actionsOrError = sequence(
      entity.actions?.map(actionEntity => this.actionEntityMapper.fromPersistence(actionEntity)),
    );

    if (actionsOrError.isLeft()) {
      return left(actionsOrError.value);
    }

    return Cause.create(
      {
        name: entity.name,
        description: entity.description,
        durationDays: entity.durationDays,
        ods: entity.ods,
        initialDate: entity.initialDate,
        communityId: entity.communityId,
        actions: actionsOrError.value,
      },
      entity.id,
    );
  }
}
