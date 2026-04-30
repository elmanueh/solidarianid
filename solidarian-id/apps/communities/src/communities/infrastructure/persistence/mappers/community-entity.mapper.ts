import { CauseEntityMapper } from '@app/communities/causes/infrastructure/persistence/mappers/cause-entity.mapper';
import { Community } from '@app/communities/shared/domain/model/aggregates/community';
import { MemberType } from '@app/communities/shared/domain/model/enums/member-type';
import { Either, left, sequence } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { User } from '../../../../shared/domain/model/entities/user';
import { UserEntityMapper } from '../../../../shared/infrastructure/persistence/mappers/user-entity.mapper';
import { CommunityEntity } from '../entities/community.entity';
import { CommunityUserEntityMapper } from './community-user-entity.mapper';

@Injectable()
export class CommunityEntityMapper implements Mapper<Community, CommunityEntity> {
  constructor(
    private readonly causesEntityMapper: CauseEntityMapper,
    private readonly userEntityMapper: UserEntityMapper,
  ) {}
  toPersistence(model: Community): CommunityEntity {
    const entity = new CommunityEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;

    if (model.members && model.members.length > 0) {
      entity.members = model.members.map(member => {
        return CommunityUserEntityMapper.toPersistence(member, model);
      });
    }

    if (model.causes && model.causes.length > 0) {
      entity.causes = model.causes.map(cause => this.causesEntityMapper.toPersistence(cause));
    }

    return entity;
  }

  fromPersistence(entity: CommunityEntity): Either<ValidationError, Community> {
    const causesOrError = sequence(
      entity.causes?.map(causeEntity => this.causesEntityMapper.fromPersistence(causeEntity)),
    );

    if (causesOrError.isLeft()) {
      return left(causesOrError.value);
    }

    const admins: User[] = [];
    let creator: User | null = null;

    const membersOrError = sequence(
      entity.members?.map(communityUserEntity => {
        const user = this.userEntityMapper.fromPersistence(communityUserEntity.user);
        if (user.isRight()) {
          if (communityUserEntity.role === MemberType.CREATOR) {
            creator = user.value;
          } else if (communityUserEntity.role === MemberType.ADMIN) {
            admins.push(user.value);
          }
        }
        return user;
      }),
    );

    if (membersOrError.isLeft()) {
      return left(membersOrError.value);
    }

    if (!creator) {
      return left(new ValidationError('Community must have a creator'));
    }

    return Community.create(
      {
        name: entity.name,
        description: entity.description,
        creator,
        members: membersOrError.value,
        admins,
        causes: causesOrError.value,
      },
      entity.id,
    );
  }
}
