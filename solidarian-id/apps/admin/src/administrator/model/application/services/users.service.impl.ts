import { Either } from '@app/ddd/either';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { User } from '../../domain/models/user';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { UserRepositoryPort, PaginatedResult } from '../../domain/ports/output/user.repository.port';
import { UserQueryRepositoryPort } from '../../domain/ports/output/user-query.repository.port';
import { UserGroupByCountryData } from '../data/user-group-by-country.data';

/**
 * Implementación del servicio de usuarios
 * Orquesta las operaciones del repositorio y aplica lógica de negocio
 */
@Injectable()
export class UsersServiceImpl extends UsersService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly userQueryRepository: UserQueryRepositoryPort,
  ) {
    super();
  }

  /**
   * Obtiene usuarios de forma paginada
   */
  async getPaginatedUsers(page: number, limit: number): Promise<Either<RepositoryException, PaginatedResult<User>>> {
    return await this.userRepository.findPaginated(page, limit);
  }

  /**
   * Obtiene un usuario específico por su ID
   */
  async getUserById(id: string): Promise<Either<RepositoryException, User>> {
    return await this.userRepository.findById(id);
  }

  /**
   * Obtiene el total de usuarios en el sistema
   */
  async getTotalUsers(): Promise<Either<RepositoryException, number>> {
    return await this.userRepository.countAll();
  }

  async getUsersGroupByCountry(limit: number): Promise<Either<RepositoryException, UserGroupByCountryData[]>> {
    return await this.userQueryRepository.findUsersGroupByCountry(limit);
  }
}
