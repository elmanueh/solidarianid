import { Either, left, right } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { InvalidUniqueEntityIDError } from '@app/value-objects/errors/validation/unique-entity-id-validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { Community } from 'apps/communities/src/domain/model/entities/community';
import { CommunityEntity } from 'apps/communities/src/infrastructure/persistence/entities/community.entity';

@Injectable()
export class CommunityMapper implements Mapper<Community, CommunityEntity> {
  toPersistence(model: Community): CommunityEntity {
    const entity = new CommunityEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;

    return entity;
  }

  fromPersistence(
    entity: CommunityEntity,
  ): Either<InvalidUniqueEntityIDError, Community> {
    const id = UniqueEntityID.create(entity.id);

    if (id.isLeft()) {
      return left(id.value);
    }

    const model = Community.create(
      {
        name: entity.name,
        description: entity.description,
      },
      id.value,
    );

    return right(model);
  }
}
