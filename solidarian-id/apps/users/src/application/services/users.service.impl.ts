import { DomainEvents } from '@app/ddd/domain-events';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserConflictError } from '@app/users/domain/errors/userconflict-error';
import { User } from '@app/users/domain/model/user';
import { UsersPublisherPort } from '@app/users/domain/ports/users.publisher.port';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { RegisterUserCommand, UpdateUserProfileCommand, UsersService } from '@app/users/domain/services/users.service';
import { PasswordManager } from '@app/utils/security/password-manager';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { MobilePhone } from '@app/value-objects/model/mobile-phone';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { CauseCategory, DurationPreference } from '@app/value-objects/model/user-preferences';
import { Username } from '@app/value-objects/model/username';
import { Injectable } from '@nestjs/common';
import { EventType } from '@solidarianid/kafka';

@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    private readonly usersRepository: UsersRepositoryPort,
    private readonly domainEvents: DomainEvents,
    private readonly passwordManager: PasswordManager,
    private readonly usersPublisher: UsersPublisherPort,
  ) {
    super();
  }

  async registerUser(command: RegisterUserCommand): Promise<Either<Error, string>> {
    // 1. Hashear la contraseña desde el principio para evitar trabajo innecesario
    const passwordHashingResult = await this.passwordManager.validateAndHashPassword(command.password);
    if (passwordHashingResult.isLeft()) return left(passwordHashingResult.value);

    // 2. Crear Value Objects móvil y username para comprobar unicidad
    const phoneResult = MobilePhone.create(command.mobilePhone);
    if (phoneResult.isLeft()) return left(phoneResult.value);

    const usernameResult = Username.create(command.username);
    if (usernameResult.isLeft()) return left(usernameResult.value);

    // 2a. Comprobar si el numero de telefono ya existe
    const userPhoneExists = await this.usersRepository.existsByMobilePhone(phoneResult.value.value);
    if (userPhoneExists.isLeft()) return left(userPhoneExists.value);

    if (userPhoneExists.value)
      return left(new UserConflictError('The provided mobile phone is already signed up in SolidarianID.'));

    // 2b. Comprobar si el nombre de usuario existe
    const userNameExists = await this.usersRepository.existsByUsername(usernameResult.value.value);
    if (userNameExists.isLeft()) return left(userNameExists.value);

    if (userNameExists.value)
      return left(new UserConflictError('The provided user name is already signed up in SolidarianID.'));

    // 3. Crear el usuario
    const user = User.create({
      fullName: command.fullName,
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

    await this.usersPublisher.publish(EventType.USER_CREATED, user.value);

    const events = user.value.pullDomainEvents();
    this.domainEvents.dispatch(events);

    // 6. Retornar ID del usuario creado
    return right(user.value.id.value);
  }

  async loginUser(username: string, password: string): Promise<Either<Error, boolean>> {
    const usernameOrError = Username.create(username);
    if (usernameOrError.isLeft()) return left(usernameOrError.value);

    const userOrError = await this.usersRepository.findByUsername(usernameOrError.value.value);

    if (userOrError.isLeft()) return left(userOrError.value);

    const passwordMatch = await this.passwordManager.comparePassword(password, userOrError.value.passwordHash);

    return right(passwordMatch);
  }

  async updateUserProfile(
    userId: string,
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    const { fullName, username, mobilePhone, city, countryCode } = updateUserProfileCommand;

    const userOrError = await this.usersRepository.findById(userId);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const mobilePhoneUnavailable = await this.isMobilePhoneUnavailable(mobilePhone, userId);
    if (mobilePhoneUnavailable.isLeft()) return left(mobilePhoneUnavailable.value);
    if (mobilePhoneUnavailable.value)
      return left(new UserConflictError('The provided mobile phone is already signed up in SolidarianID.'));

    const usernameUnavailable = await this.isUsernameUnavailable(username, userId);
    if (usernameUnavailable.isLeft()) return left(usernameUnavailable.value);
    if (usernameUnavailable.value)
      return left(new UserConflictError('The provided user name is already signed up in SolidarianID.'));

    const userUpdateOrError = user.updateUserProfile(fullName, username, mobilePhone, city, countryCode);

    if (userUpdateOrError.isLeft()) {
      return left(userUpdateOrError.value);
    }

    const saveResult = await this.usersRepository.save(user);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    const events = user.pullDomainEvents();
    this.domainEvents.dispatch(events);

    await this.usersPublisher.publish(EventType.USER_UPDATED, user);

    return right(undefined);
  }

  async getUserPreferences(userId: string): Promise<
    Either<
      ValidationError | RepositoryException,
      {
        preferredSDGs: SustainableDevelopmentGoal[];
        preferredCategories: CauseCategory[];
        durationPreferences: DurationPreference[];
        notificationsEnabled: boolean;
      }
    >
  > {
    const userOrError = await this.usersRepository.findById(userId, ['preferences']);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;
    const preferences = user.userPreferences;

    return right({
      preferredSDGs: [...preferences.preferredSDGs],
      preferredCategories: [...preferences.preferredCategories],
      durationPreferences: [...preferences.durationPreferences],
      notificationsEnabled: preferences.notificationsEnabled,
    });
  }

  async updateUserPreferences(
    userId: string,
    preferences: Partial<{
      preferredSDGs: SustainableDevelopmentGoal[];
      preferredCategories: CauseCategory[];
      durationPreferences: DurationPreference[];
      notificationsEnabled: boolean;
    }>,
  ): Promise<Either<ValidationError | RepositoryException, void>> {
    const userOrError = await this.usersRepository.findById(userId, ['preferences']);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const prefsUpdateOrError = user.updateUserPreferences(preferences);

    if (prefsUpdateOrError.isLeft()) {
      return left(prefsUpdateOrError.value);
    }

    const saveResult = await this.usersRepository.save(user);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    const events = user.pullDomainEvents();
    this.domainEvents.dispatch(events);

    return right(undefined);
  }

  private async isMobilePhoneUnavailable(
    mobilePhone: string | undefined,
    excludeUserId?: string,
  ): Promise<Either<RepositoryException, boolean>> {
    if (mobilePhone) {
      const mobilePhoneExists = await this.usersRepository.existsByMobilePhone(mobilePhone, excludeUserId);
      return mobilePhoneExists;
    }

    return right(false);
  }

  private async isUsernameUnavailable(
    username: string | undefined,
    excludeUserId?: string,
  ): Promise<Either<RepositoryException, boolean>> {
    if (username) {
      const usernameExists = await this.usersRepository.existsByUsername(username, excludeUserId);
      return usernameExists;
    }

    return right(false);
  }
}
