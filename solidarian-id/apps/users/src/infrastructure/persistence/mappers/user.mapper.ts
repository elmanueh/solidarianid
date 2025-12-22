import { User } from '@app/users/domain/model/user';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Password } from '@app/value-objects/model/password';
import { UserLocation } from '@app/value-objects/model/user-location';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { UserProps } from '@app/users/domain/model/user';
import { Either, right, left } from '@app/ddd/either';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements Mapper<User, UserEntity> {
  toPersistence(user: User) {
    const entity = new UserEntity();
    entity.id = user.id.value;
    entity.username = user.username.value;
    entity.mobilePhone = user.mobilePhone.value;
    entity.hashedPassword = user.password.value;
    entity.city = user.location.city;
    entity.countryCode = user.location.countryCode;
    return entity;
  }

  fromPersistence(entity: UserEntity): Either<ValidationError, User> {
    // Crear todos los VOs
    const usernameResult = Username.create(entity.username);
    const mobilePhoneResult = MobilePhone.create(entity.mobilePhone);
    const passwordVO = Password.fromHash(entity.hashedPassword); // Ya está hasheado
    const locationResult = UserLocation.create(entity.city, entity.countryCode);
    const idResult = UniqueEntityID.create(entity.id);

    // Validar los Either
    if (usernameResult.isLeft()) return left(usernameResult.value);
    if (mobilePhoneResult.isLeft()) return left(mobilePhoneResult.value);
    if (locationResult.isLeft()) return left(locationResult.value);
    if (idResult.isLeft()) return left(idResult.value);

    // Construir props con los VOs validados
    const userProps: UserProps = {
      username: usernameResult.value,
      mobilePhone: mobilePhoneResult.value,
      password: passwordVO,
      location: locationResult.value,
    };

    // Crear el User con constructor
    return right(User.create(userProps, idResult.value));
  }
}
