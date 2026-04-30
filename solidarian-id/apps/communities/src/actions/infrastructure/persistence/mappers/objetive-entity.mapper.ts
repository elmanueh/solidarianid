import { User } from '@app/communities/shared/domain/model/entities/user';
import { Objective } from '@app/communities/shared/domain/model/value-objects/objective';
import { Either, left, sequence } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { ObjectiveEntity } from '../entities/objective.entity';
import { ObjetiveUserEntity } from '../entities/objetive-user.entity';

@Injectable()
export class ObjectiveEntityMapper implements Mapper<Objective, ObjectiveEntity> {
  toPersistence(model: Objective): ObjectiveEntity {
    const entity = new ObjectiveEntity();
    entity.name = model.name;
    entity.description = model.description;
    entity.quantity = model.quantity;
    entity.currentAmount = model.currentAmount;
    entity.unit = model.unit;
    entity.actionId = model.actionId;

    entity.contributors = model.contributors.map(contributor => {
      const objetiveUser = new ObjetiveUserEntity();
      objetiveUser.name = model.name;
      objetiveUser.actionId = model.actionId;
      objetiveUser.userId = contributor.id.value;
      objetiveUser.fullname = contributor.fullName;
      objetiveUser.email = contributor.email;
      objetiveUser.mobilePhone = contributor.mobilePhone;
      return objetiveUser;
    });
    return entity;
  }

  fromPersistence(entity: ObjectiveEntity): Either<ValidationError, Objective> {
    const contributorsOrError = sequence(
      entity.contributors?.map(contributorEntity =>
        User.create(
          {
            fullName: contributorEntity.fullname,
            email: contributorEntity.email,
            mobilePhone: contributorEntity.mobilePhone,
          },
          contributorEntity.userId,
        ),
      ),
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
