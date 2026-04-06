import { Either } from '@app/ddd/either';
import { LoginInvalidException } from '@app/users/domain/errors/login-invalid.exception';

export interface AuthTokens {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export abstract class AuthService {
  /**
   * Inicia sesión de un usuario con su nombre de usuario y contraseña.
   * @param username
   * @param password
   */
  abstract loginUsernamePassword(
    username: string,
    password: string,
  ): Promise<Either<LoginInvalidException, AuthTokens>>;
  abstract refresh(refreshToken: string): Promise<Either<Error, AuthTokens>>;
  abstract logout(userId: string): Promise<Either<Error, void>>;
}
