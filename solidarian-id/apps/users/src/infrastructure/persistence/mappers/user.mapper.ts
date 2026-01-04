import { User } from '@app/users/domain/model/user';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either } from '@app/ddd/either';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements Mapper<User, UserEntity> {
  toPersistence(user: User) {
    const entity = new UserEntity();
    entity.id = user.id.value;
    entity.fullName = user.fullName;
    entity.username = user.username;
    entity.mobilePhone = user.mobilePhone;
    entity.passwordHash = user.passwordHash;
    entity.city = user.city;
    entity.countryCode = user.countryCode;
    return entity;
  }

  fromPersistence(entity: UserEntity): Either<ValidationError, User> {
    return User.create(
      {
        fullName: entity.fullName,
        username: entity.username,
        mobilePhone: entity.mobilePhone,
        passwordHash: entity.passwordHash,
        city: entity.city,
        countryCode: entity.countryCode,
      },
      entity.id,
    );
  }
}
