import { Mapper } from '@app/ddd/repository/mapper';
import { Injectable } from '@nestjs/common';
import { Either, left, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Objective } from '@app/communities/domain/model/value-objects/objective';
import { ObjectiveEntity } from '../entities/objective.entity';
import { UserEntityMapper } from './user-entity.mapper';

@Injectable()
export class ObjectiveEntityMapper implements Mapper<Objective, ObjectiveEntity> {
  constructor(private readonly userEntityMapper: UserEntityMapper) {}
  toPersistence(model: Objective): ObjectiveEntity {
    const entity = new ObjectiveEntity();
    entity.name = model.name;
    entity.description = model.description;
    entity.quantity = model.quantity;
    entity.currentAmount = model.currentAmount;
    entity.unit = model.unit;
    entity.actionId = model.actionId;

    entity.contributors =
      model.contributors?.map(contributor => this.userEntityMapper.toPersistence(contributor)) || [];
    return entity;
  }

  fromPersistence(entity: ObjectiveEntity): Either<ValidationError, Objective> {
    const contributorsOrError = sequence(
      entity.contributors?.map(contributorEntity => this.userEntityMapper.fromPersistence(contributorEntity)),
    );

    if (contributorsOrError.isLeft()) {
      return left(contributorsOrError.value);
    }

    return Objective.create({
      name: entity.name,
      description: entity.description,
      quantity: entity.quantity,
      unit: entity.unit,
      actionId: entity.actionId,
      contributors: contributorsOrError.value,
      currentAmount: entity.currentAmount,
    });
  }
}
