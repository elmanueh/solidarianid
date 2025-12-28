import { Either, left } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CommunityEntity } from '../entities/community.entity';
import { Community } from '@app/communities/communities/domain/model/aggregates/community';
import { User } from '@app/communities/communities/domain/model/entities/user';

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
    const usuarioPrueba = User.create({ username: 'prueba' });
    if (usuarioPrueba.isLeft()) {
      return left(usuarioPrueba.value);
    }

    return Community.create(
      {
        name: entity.name,
        description: entity.description,
        creator: usuarioPrueba.value,
        causes: [],
      },
      entity.id,
    );
  }
}
