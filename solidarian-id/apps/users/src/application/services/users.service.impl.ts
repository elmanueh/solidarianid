import { Injectable } from '@nestjs/common';
import {
  UsersService,
  RegisterUserCommand,
} from '@app/users/domain/services/users.service';
import { User } from '@app/users/domain/model/user';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { Either, right, left } from '@app/ddd/either';
import { UserConflictError } from '@app/users/domain/errors/userconflict-error';
import { PasswordManager } from '@app/utils/security/password-manager';

@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    private readonly usersRepository: UsersRepositoryPort,
    private readonly passwordManager: PasswordManager,
  ) {
    super();
  }

  async registerUser(
    command: RegisterUserCommand,
  ): Promise<Either<Error, string>> {
    // 1. Hashear la contraseña lo primero de todo para evitar realizar trabajo innecesario
    const passwordHashingResult =
      await this.passwordManager.validateAndHashPassword(command.password);
    if (passwordHashingResult.isLeft()) {
      return left(passwordHashingResult.value);
    }

    // 2. Crear Value Objects móvil y username para comprobar unicidad
    const phoneResult = MobilePhone.create(command.mobilePhone);
    if (phoneResult.isLeft()) {
      return left(phoneResult.value);
    }

    const usernameResult = Username.create(command.username);
    if (usernameResult.isLeft()) {
      return left(usernameResult.value);
    }

    // 2a. Comprobar si el numero de telefono ya existe
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

    // 2b. Comprobar si el nombre de usuario existe
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

    // 3. Crear el usuario
    const user = User.create({
      username: command.username,
      mobilePhone: command.mobilePhone,
      passwordHash: passwordHashingResult.value,
      city: command.city,
      countryCode: command.countryCode,
    });

    if (user.isLeft()) return left(user.value);

    // 5. Persistir en BD
    const res = await this.usersRepository.save(user.value);

    if (res.isLeft()) return left(res.value);

    // 6. Retornar ID del usuario creado
    return right(user.value.id.value);
  }
}
