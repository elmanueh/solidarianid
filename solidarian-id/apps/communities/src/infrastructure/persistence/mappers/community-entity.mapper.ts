import { Either, left, sequence } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CommunityEntity } from '../entities/community.entity';
import { UserEntityMapper } from './user-entity.mapper';
import { User } from '../../../domain/model/entities/user';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { CauseEntityMapper } from './cause-entity.mapper';
import { CommunityUserEntityMapper } from './community-user-entity.mapper';

@Injectable()
export class CommunityEntityMapper implements Mapper<
  Community,
  CommunityEntity
> {
  constructor(
    private readonly causesEntityMapper: CauseEntityMapper,
    private readonly userEntityMapper: UserEntityMapper,
  ) {}
  toPersistence(model: Community): CommunityEntity {
    const entity = new CommunityEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;

    entity.members =
      model.members?.map((member) =>
        CommunityUserEntityMapper.toPersistence(member, model),
      ) || [];

    entity.causes =
      model.causes?.map((cause) =>
        this.causesEntityMapper.toPersistence(cause),
      ) || [];

    return entity;
  }

  fromPersistence(entity: CommunityEntity): Either<ValidationError, Community> {
    const causesOrError = sequence(
      entity.causes?.map((causeEntity) =>
        this.causesEntityMapper.fromPersistence(causeEntity),
      ),
    );

    if (causesOrError.isLeft()) {
      return left(causesOrError.value);
    }

    const admins: User[] = [];

    const membersOrError = sequence(
      entity.members?.map((communityUserEntity) => {
        const user = this.userEntityMapper.fromPersistence(
          communityUserEntity.user,
        );
        if (user.isRight() && communityUserEntity.role === 'admin') {
          admins.push(user.value);
        }
        return user;
      }),
    );

    if (membersOrError.isLeft()) {
      return left(membersOrError.value);
    }

    return Community.create(
      {
        name: entity.name,
        description: entity.description,
        members: membersOrError.value,
        admins,
        causes: causesOrError.value,
      },
      entity.id,
    );
  }
}
