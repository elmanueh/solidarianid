import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { LoginInvalidException } from '@app/users/domain/errors/login-invalid.exception';
import { User } from '@app/users/domain/model/user';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { CauseCategory, DurationPreference } from '@app/value-objects/model/user-preferences';

/**
 * Servicio para la gestión de usuarios en el sistema.
 */
export abstract class UsersService {
  /**
   * Obtiene la información de un usuario dado su username
   */
  abstract getOrRegisterUserIfNotExists(
    getOrRegisterUserCommand: RegisterUserCommand,
  ): Promise<Either<ValidationError | RepositoryException, User>>;

  /**
   *  Registra un nuevo usuario genérico en el sistema.
   * @param command
   */
  abstract registerUser(command: RegisterUserCommand): Promise<Either<Error, string>>;

  /**
   * Autentica un usuario en base a usuario y contraseña y retorna su identidad de dominio.
   * @param username
   * @param password
   */
  abstract authenticate(
    username: string,
    password: string,
  ): Promise<Either<LoginInvalidException | ValidationError | RepositoryException, User>>;

  /**
   * Actualiza el perfil de un usuario existente.
   * @param userId
   * @param updateUserProfileCommand
   */
  abstract updateUserProfile(
    userId: string,
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<Either<ValidationError | RepositoryException, void>>;

  /**
   * Obtiene las preferencias de un usuario existente.
   * @param userId
   */
  abstract getUserPreferences(userId: string): Promise<
    Either<
      ValidationError | RepositoryException,
      {
        preferredSDGs: SustainableDevelopmentGoal[];
        preferredCategories: CauseCategory[];
        durationPreferences: DurationPreference[];
        notificationsEnabled: boolean;
      }
    >
  >;

  /**
   * Actualiza las preferencias de un usuario existente.
   * @param userId
   * @param preferences
   */
  abstract updateUserPreferences(
    userId: string,
    preferences: Partial<{
      preferredSDGs: SustainableDevelopmentGoal[];
      preferredCategories: CauseCategory[];
      durationPreferences: DurationPreference[];
      notificationsEnabled: boolean;
    }>,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}

export interface RegisterUserCommand {
  fullName: string;
  username: string;
  mobilePhone: string;
  password: string;
  city: string;
  countryCode: string;
}

export interface UpdateUserProfileCommand {
  fullName?: string;
  username?: string;
  mobilePhone?: string;
  city?: string;
  countryCode?: string;
}
