import { Either } from '@app/ddd/either';
import { Administrator } from '../models/administrator';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { AuthError } from '@app/ddd/errors/auth-error';
import { ConflictError } from '@app/ddd/errors/conflict-error';

/**
 * Servicio de autenticación
 * Define las operaciones de autenticación disponibles
 */
export abstract class AuthService {
  /**
   * Registra un nuevo administrador
   * @param fullname nombre completo
   * @param email email
   * @param phone telefono en formato internacional
   * @param password  contraseña en texto plano sin cifrar
   */
  public abstract register(
    fullname: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<Either<AuthError | ConflictError | ValidationError, Administrator>>;

  /**
   * Inicia sesión de un administrador
   * @param email email
   * @param password contraseña en texto plano sin cifrar
   */
  public abstract login(email: string, password: string): Promise<Either<AuthError, Administrator>>;
}
