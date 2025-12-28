import { Either } from '@app/ddd/either';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { User } from '../../domain/model/user';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import {
  UserRepositoryPort,
  PaginatedResult,
} from '../../domain/ports/output/user.repository.port';

/**
 * Implementación del servicio de usuarios
 * Orquesta las operaciones del repositorio y aplica lógica de negocio
 */
@Injectable()
export class UserServiceImpl extends UserService {
  constructor(private readonly userRepository: UserRepositoryPort) {
    super();
  }

  /**
   * Obtiene usuarios de forma paginada
   */
  async getPaginatedUsers(
    page: number,
    limit: number,
  ): Promise<Either<Error, PaginatedResult<User>>> {
    return await this.userRepository.findAll(page, limit);
  }

  /**
   * Obtiene un usuario específico por su ID
   */
  async getUserById(id: string): Promise<Either<UserNotFoundError, User>> {
    return await this.userRepository.findById(id);
  }

  /**
   * Obtiene el total de usuarios en el sistema
   */
  async getTotalUsers(): Promise<number> {
    return await this.userRepository.countAll();
  }
}
