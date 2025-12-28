import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

/**
 * Servicio para la gestión de usuarios en el sistema.
 */
export abstract class UsersService {
  /**
   *  Registra un nuevo usuario genérico en el sistema.
   * @param command
   */
  abstract registerUser(
    command: RegisterUserCommand,
  ): Promise<Either<Error, string>>;

  /**
   * Inicia sesión de un usuario con su nombre de usuario y contraseña.
   * @param username
   * @param password
   */
  abstract loginUser(
    username: string,
    password: string,
  ): Promise<Either<Error, boolean>>;

  /**
   * Actualiza el perfil de un usuario existente.
   * @param userId
   * @param updateUserProfileCommand
   */
  abstract updateUserProfile(
    userId: string,
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<Either<ValidationError | RepositoryException, void>>;
}

export interface RegisterUserCommand {
  username: string;
  mobilePhone: string;
  password: string;
  city: string;
  countryCode: string;
}

export interface UpdateUserProfileCommand {
  username?: string;
  mobilePhone?: string;
  city?: string;
  countryCode?: string;
}
