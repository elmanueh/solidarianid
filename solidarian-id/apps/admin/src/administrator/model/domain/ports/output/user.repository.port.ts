import { Either } from '@app/ddd/either';
import { User } from '../../models/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

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
 * Extiende del repositorio base y añade operaciones específicas de dominio
 *
 * Este puerto será implementado por un adaptador (FakeUserRepository o MongoUserRepository)
 */
export abstract class UserRepositoryPort extends Repository<User> {
  /**
   * Obtiene usuarios de forma paginada
   * @param page Número de página (empieza en 1)
   * @param limit Número de usuarios por página
   * @returns Either con error o resultado paginado con usuarios
   */
  abstract findPaginated(
    page: number,
    limit: number,
  ): Promise<Either<RepositoryException, PaginatedResult<User>>>;

  /**
   * Cuenta el total de usuarios en el sistema
   * @returns Número total de usuarios
   */
  abstract countAll(): Promise<number>;
}
