import { Injectable, BadRequestException } from '@nestjs/common';
import {
  UserServicePort,
  RegisterUserCommand,
} from '@app/users/domain/ports/in/users.service.port';
import { User } from '@app/users/domain/model/user';
import { Username } from '@app/value-objects/model/username';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { Password } from '@app/value-objects/model/password';
import { UserLocation } from '@app/value-objects/model/user-location';
import { PasswordHasherPort } from '@app/utils/password-hasher/password-hasher.port';
import { UsersRepositoryPort } from '@app/users/domain/ports/out/users.repository.port';

@Injectable()
export class UsersService extends UserServicePort {
  constructor(
    private readonly hasher: PasswordHasherPort,
    private readonly usersRepository: UsersRepositoryPort,
  ) {
    super();
  }

  async registerUser(command: RegisterUserCommand): Promise<string> {
    // 1. Crear Value Objects
    const usernameResult = Username.create(command.username);
    const phoneResult = MobilePhone.create(command.mobilePhone);
    const passwordResult = await Password.create(command.password, (plain) =>
      this.hasher.hash(plain),
    );
    const locationResult = UserLocation.create(
      command.city,
      command.countryCode,
    );

    // 3. Validar Either's
    if (usernameResult.isLeft()) {
      throw new BadRequestException(usernameResult.value.message);
    }
    if (phoneResult.isLeft()) {
      throw new BadRequestException(phoneResult.value.message);
    }
    if (passwordResult.isLeft()) {
      throw new BadRequestException(passwordResult.value.message);
    }

    if (locationResult.isLeft()) {
      throw new BadRequestException(locationResult.value.message);
    }

    // 4. Crear User
    const userResult = User.create({
      username: usernameResult.value,
      mobilePhone: phoneResult.value,
      password: passwordResult.value,
      location: locationResult.value,
    });

    if (userResult.isLeft()) {
      throw new BadRequestException('Invalid user data');
    }

    const user = userResult.value;

    // 5. Persistir en BD
    await this.usersRepository.save(user);

    // 5. Log temporal (sin BD por ahora)
    console.log('=== USER REGISTERED ===');
    console.log('ID:', user.id.value);
    console.log('Username:', user.username.value);
    console.log('Mobile Phone:', user.mobilePhone.value);
    console.log('Hashed Password:', user.password.value);
    console.log('Location:', {
      city: user.location.city,
      countryCode: user.location.countryCode,
    });
    console.log('=======================');

    // 6. Retornar ID del usuario creado
    return user.id.value;
  }
}
