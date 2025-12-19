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
import { MobilePhoneAlreadyTakenError } from '@app/users/domain/errors/phone-alreadytaken-error';

@Injectable()
export class UsersService extends UsersServicePort {
  constructor(private readonly usersRepository: UsersRepositoryPort) {
    super();
  }

  async registerUser(
    command: RegisterUserCommand,
  ): Promise<Either<EvalError, string>> {
    // 1. Crear Value Object de mobile phone
    const phoneResult = MobilePhone.create(command.mobilePhone);
    if (phoneResult.isLeft()) {
      return left(phoneResult.value);
    }

    // 2. Comprobar si el numero de telefono ya existe
    const userExists = await this.usersRepository.existsByMobilePhone(
      phoneResult.value,
    );
    if (userExists.isLeft()) return left(userExists.value);

    if (userExists.value)
      return left(
        new MobilePhoneAlreadyTakenError(
          'The provided mobile phone is already signed up in SolidarianID.',
        ),
      );

    const passwordResult = await Password.create(command.password);
    const usernameResult = Username.create(command.username);
    const locationResult = UserLocation.create(
      command.city,
      command.countryCode,
    );

    // 3. Validar Either's
    if (usernameResult.isLeft()) {
      return left(usernameResult.value);
    }

    if (passwordResult.isLeft()) {
      return left(passwordResult.value);
    }

    if (locationResult.isLeft()) {
      return left(locationResult.value);
    }

    // 4. Crear User
    const user = User.create({
      username: usernameResult.value,
      mobilePhone: phoneResult.value,
      password: passwordResult.value,
      location: locationResult.value,
    });

    // 5. Persistir en BD
    await this.usersRepository.save(user);

    // 6. Retornar ID del usuario creado
    return right(user.id.value);
  }
}
