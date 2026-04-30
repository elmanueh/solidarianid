import { ActionEntityMapper } from '@app/communities/actions/infrastructure/persistence/mappers/action-entity.mapper';
import { Cause } from '@app/communities/shared/domain/model/aggregates/cause';
import { Either, left, sequence } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CauseUserEntity } from '../entities/cause-user.entity';
import { CauseEntity } from '../entities/cause.entity';

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

    entity.users = model.userIds.map(userId => {
      const causeUserEntity = new CauseUserEntity();
      causeUserEntity.causeId = model.id.value;
      causeUserEntity.userId = userId;
      return causeUserEntity;
    });

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
        userIds: entity.users?.map(causeUserEntity => causeUserEntity.userId) ?? [],
        actions: actionsOrError.value,
      },
      entity.id,
    );
  }
}
