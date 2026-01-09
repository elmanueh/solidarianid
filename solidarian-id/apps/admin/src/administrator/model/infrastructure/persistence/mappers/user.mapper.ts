import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/user.entity';
import { Either } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements Mapper<User, UserEntity> {
  toPersistence(user: User): UserEntity {
    return {
      _id: user.id.value,
      fullName: user.fullName,
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
    return User.reconstitute({
      id: document._id,
      fullName: document.fullName,
      username: document.username,
      phone: document.phone,
      city: document.location.city,
      countryCode: document.location.countryCode,
      communityMemberships: document.communityMemberships.map(m => ({
        communityId: m.communityId,
        communityName: m.communityName,
        isAdmin: m.isAdmin,
      })),
    });
  }
}
