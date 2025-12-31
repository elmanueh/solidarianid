import { Mapper } from '@app/ddd/repository/mapper';
import { Injectable } from '@nestjs/common';
import { Either, left, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Objective } from '@app/communities/domain/model/entities/objective';
import { ObjetiveEntity } from '../entities/objetive.entity';
import { UserEntityMapper } from './user-entity.mapper';

@Injectable()
export class ObjectiveEntityMapper implements Mapper<
  Objective,
  ObjetiveEntity
> {
  constructor(private readonly userEntityMapper: UserEntityMapper) {}
  toPersistence(model: Objective): ObjetiveEntity {
    const entity = new ObjetiveEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;
    entity.quantity = model.quantity;
    entity.currentAmount = model.currentAmount;
    entity.unit = model.unit;
    entity.actionId = model.actionId;

    entity.contributors = model.contributors.map((contributor) =>
      this.userEntityMapper.toPersistence(contributor),
    );
    return entity;
  }

  fromPersistence(entity: ObjetiveEntity): Either<ValidationError, Objective> {
    const contributorsOrError = sequence(
      entity.contributors.map((contributorEntity) =>
        this.userEntityMapper.fromPersistence(contributorEntity),
      ),
    );

    if (contributorsOrError.isLeft()) {
      return left(contributorsOrError.value);
    }

    return Objective.create(
      {
        name: entity.name,
        description: entity.description,
        quantity: entity.quantity,
        unit: entity.unit,
        actionId: entity.actionId,
        contributors: contributorsOrError.value,
        currentAmount: entity.currentAmount,
      },
      entity.id,
    );
  }
}
