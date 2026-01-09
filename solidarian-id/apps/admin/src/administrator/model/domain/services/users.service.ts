import { Either } from '@app/ddd/either';
import { User } from '../models/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { PaginatedResult } from '@app/admin/administrator/model/domain/models/value-objects/paginated-result';

/**
 * Servicio de dominio para usuarios
 * Define las operaciones de negocio disponibles sobre usuarios
 */
export abstract class UsersService {
  /**
   * Obtiene usuarios de forma paginada
   * @param page Número de página (empieza en 1)
   * @param limit Número de usuarios por página
   * @returns Either con error o resultado paginado
   */
  abstract getPaginatedUsers(page: number, limit: number): Promise<Either<RepositoryException, PaginatedResult<User>>>;

  /**
   * Obtiene un usuario específico por su ID
   * @param id ID del usuario (UUID v4)
   * @returns Either con UserNotFoundError si no existe o el usuario encontrado
   */
  abstract getUserById(id: string): Promise<Either<RepositoryException | UserNotFoundError, User>>;

  /**
   * Obtiene el total de usuarios en el sistema
   * @returns Número total de usuarios
   */
  abstract getTotalUsers(): Promise<number>;
}
