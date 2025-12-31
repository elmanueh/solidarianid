import { Either } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UserEntity } from '../entities/user.entity';
import { User } from '@app/communities/domain/model/entities/user';
import { Mapper } from '@app/ddd/repository/mapper';

export class UserEntityMapper implements Mapper<User, UserEntity> {
  toPersistence(model: User): UserEntity {
    const entity = new UserEntity();
    entity.id = model.id.value;
    entity.username = model.username;
    return entity;
  }

  fromPersistence(entity: UserEntity): Either<ValidationError, User> {
    return User.create(
      {
        username: entity.username,
      },
      entity.id,
    );
  }
}
