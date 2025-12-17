import { User } from '@app/users/domain/model/user';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Password } from '@app/value-objects/model/password';
import { UserLocation } from '@app/value-objects/model/user-location';

export class UserMapper {
  static toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id.value;
    entity.username = user.username.value;
    entity.mobilePhone = user.mobilePhone.value;
    entity.hashedPassword = user.password.value;
    entity.city = user.location.city;
    entity.countryCode = user.location.countryCode;
    return entity;
  }

  static toDomain(entity: UserEntity): User {
    // Reconstruir Value Objects desde valores primitivos
    const idResult = UniqueEntityID.create(entity.id);
    const usernameResult = Username.create(entity.username);
    const phoneResult = MobilePhone.create(entity.mobilePhone);
    //Password fromhash no devuelve either porque no hay validación
    const password = Password.fromHash(entity.hashedPassword);
    const locationResult = UserLocation.create(entity.city, entity.countryCode);

    // Validar que todos los Value Objects se hayan creado correctamente
    // Los datos de BD deberían ser válidos siempre, pero por seguridad validamos
    if (idResult.isLeft()) {
      throw new Error(`Invalid ID from database: ${entity.id}`);
    }
    if (usernameResult.isLeft()) {
      throw new Error(`Invalid username from database: ${entity.username}`);
    }
    if (phoneResult.isLeft()) {
      throw new Error(
        `Invalid mobile phone from database: ${entity.mobilePhone}`,
      );
    }
    if (locationResult.isLeft()) {
      throw new Error(
        `Invalid location from database: ${entity.city}, ${entity.countryCode}`,
      );
    }

    // Crear la entidad de dominio
    const userResult = User.create(
      {
        username: usernameResult.value,
        mobilePhone: phoneResult.value,
        password: password,
        location: locationResult.value,
      },
      idResult.value,
    );

    if (userResult.isLeft()) {
      throw new Error('Failed to reconstruct User from database entity');
    }

    return userResult.value;
  }
}
