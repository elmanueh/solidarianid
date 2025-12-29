import { Either } from '@app/ddd/either';
import { User } from '../../models/user';
import { UserNotFoundError } from '../../errors/user-not-found.error';

/**
 * Resultado paginado genérico
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Puerto de salida para el repositorio de usuarios
 * Define las operaciones de persistencia necesarias para los reportes
 *
 * Este puerto será implementado por un adaptador (FakeUserRepository o MongoUserRepository)
 */
export abstract class UserRepositoryPort {
  /**
   * Obtiene todos los usuarios de forma paginada
   * @param page Número de página (empieza en 1)
   * @param limit Número de usuarios por página
   * @returns Either con error o resultado paginado con usuarios
   */
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<Either<Error, PaginatedResult<User>>>;

  /**
   * Busca un usuario por su ID
   * @param id ID del usuario (UUID v4)
   * @returns Either con UserNotFoundError si no existe o el usuario encontrado
   */
  abstract findById(id: string): Promise<Either<UserNotFoundError, User>>;

  /**
   * Cuenta el total de usuarios en el sistema
   * @returns Número total de usuarios
   */
  abstract countAll(): Promise<number>;
}
