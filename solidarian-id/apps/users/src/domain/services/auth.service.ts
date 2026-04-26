import { Either } from '@app/ddd/either';

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
    deviceId?: string,
  ): Promise<Either<Error, AuthTokens>>;

  /**
   * Inicia sesión de un usuario ya autenticado externamente (por ejemplo, OAuth).
   * @param userId
   */
  abstract loginAuthenticatedUser(userId: string, deviceId?: string): Promise<Either<Error, AuthTokens>>;

  /**
   * Refresca un nuevo access token para un usuario dado su refresh token.
   * @param refreshToken
   */
  abstract refresh(refreshToken: string): Promise<Either<Error, AuthTokens>>;

  /**
   * Cierra la sesión actual de un usuario revocando su refresh token.
   * @param jti
   */
  abstract logoutCurrentSession(jti: string): Promise<Either<Error, void>>;
}
