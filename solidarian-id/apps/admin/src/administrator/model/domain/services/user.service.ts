import { Either } from '@app/ddd/either';
import { User } from '../models/user';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { PaginatedResult } from '../ports/output/user.repository.port';

/**
 * Servicio de dominio para usuarios
 * Define las operaciones de negocio disponibles sobre usuarios
 */
export abstract class UserService {
  /**
   * Obtiene usuarios de forma paginada
   * @param page Número de página (empieza en 1)
   * @param limit Número de usuarios por página
   * @returns Either con error o resultado paginado
   */
  abstract getPaginatedUsers(
    page: number,
    limit: number,
  ): Promise<Either<Error, PaginatedResult<User>>>;

  /**
   * Obtiene un usuario específico por su ID
   * @param id ID del usuario (UUID v4)
   * @returns Either con UserNotFoundError si no existe o el usuario encontrado
   */
  abstract getUserById(id: string): Promise<Either<UserNotFoundError, User>>;

  /**
   * Obtiene el total de usuarios en el sistema
   * @returns Número total de usuarios
   */
  abstract getTotalUsers(): Promise<number>;
}
