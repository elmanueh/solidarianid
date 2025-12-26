import { Injectable } from '@nestjs/common';
import {
  UsersServicePort,
  RegisterUserCommand,
} from '@app/users/domain/ports/input/users.service.port';
import { User } from '@app/users/domain/model/user';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Password } from '@app/value-objects/model/password';
import { UserLocation } from '@app/value-objects/model/user-location';
import { UsersRepositoryPort } from '@app/users/domain/ports/output/users.repository.port';
import { Either, right, left } from '@app/ddd/either';
import { UserConflictError } from '@app/users/domain/errors/userconflict-error';

@Injectable()
export class UsersService extends UsersServicePort {
  constructor(private readonly usersRepository: UsersRepositoryPort) {
    super();
  }

  async registerUser(
    command: RegisterUserCommand,
  ): Promise<Either<Error, string>> {
    // 1. Crear Value Objects para validar errores de formato lo primero.
    const phoneResult = MobilePhone.create(command.mobilePhone);
    if (phoneResult.isLeft()) {
      return left(phoneResult.value);
    }
    const usernameResult = Username.create(command.username);
    if (usernameResult.isLeft()) {
      return left(usernameResult.value);
    }

    const passwordResult = await Password.create(command.password);
    if (passwordResult.isLeft()) {
      return left(passwordResult.value);
    }

    const locationResult = UserLocation.create({
      city: command.city,
      countryCode: command.countryCode,
    });
    if (locationResult.isLeft()) {
      return left(locationResult.value);
    }

    // 2. Comprobar si el numero de telefono ya existe
    const userPhoneExists = await this.usersRepository.existsByMobilePhone(
      phoneResult.value,
    );
    if (userPhoneExists.isLeft()) return left(userPhoneExists.value);

    if (userPhoneExists.value)
      return left(
        new UserConflictError(
          'The provided mobile phone is already signed up in SolidarianID.',
        ),
      );

    // 2bis. Comprobar si el nombre de usuario existe
    const userNameExists = await this.usersRepository.existsByUsername(
      usernameResult.value,
    );
    if (userNameExists.isLeft()) return left(userNameExists.value);

    if (userNameExists.value)
      return left(
        new UserConflictError(
          'The provided user name is already signed up in SolidarianID.',
        ),
      );

    // 3. Crear User
    const user = User.create({
      username: usernameResult.value,
      mobilePhone: phoneResult.value,
      password: passwordResult.value,
      location: locationResult.value,
    });

    // 5. Persistir en BD
    const res = await this.usersRepository.save(user);

    if (res.isLeft()) return left(res.value);

    // 6. Retornar ID del usuario creado
    return right(user.id.value);
  }
}
