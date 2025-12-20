import { Either } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
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

  fromPersistence(entity: CommunityEntity): Either<ValidationError, Community> {
    return Community.create(
      {
        name: entity.name,
        description: entity.description,
      },
      entity.id,
    );
  }
}
