import { Injectable } from '@nestjs/common';
import { Either } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserEntity } from '../entities/user.entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

@Injectable()
export class UserMapper implements Mapper<User, UserEntity> {
  toPersistence(user: User): UserEntity {
    return {
      _id: user.id.value,
      username: user.username,
      phone: user.phone,
      location: {
        city: user.city,
        countryCode: user.countryCode,
      },
      communityMemberships: user.communityMemberships.map(membership => ({
        communityId: membership.communityId,
        communityName: membership.communityName,
        isAdmin: membership.isAdmin,
      })),
    } as UserEntity;
  }

  fromPersistence(document: UserEntity): Either<ValidationError, User> {
    return User.create(
      document._id,
      document.username,
      document.phone,
      document.location.city,
      document.location.countryCode,
      document.communityMemberships.map(m => ({
        communityId: m.communityId,
        communityName: m.communityName,
        isAdmin: m.isAdmin,
      })),
    );
  }
}
