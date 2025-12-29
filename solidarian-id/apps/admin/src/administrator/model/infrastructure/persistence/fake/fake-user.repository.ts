import { Either, left, right } from '@app/ddd/either';
import {
  UserRepositoryPort,
  PaginatedResult,
} from '@app/admin/administrator/model/domain/ports/output/user.repository.port';
import { User } from '@app/admin/administrator/model/domain/models/user';
import { UserNotFoundError } from '@app/admin/administrator/model/domain/errors/user-not-found.error';
import { FAKE_USERS, FakeUserData } from './fake-users.data';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

/**
 * Implementación fake del repositorio de usuarios
 * Usa datos mock en memoria para prototipado sin base de datos
 */
export class FakeUserRepository implements UserRepositoryPort {
  private users: FakeUserData[] = FAKE_USERS;

  /**
   * Obtiene todos los usuarios de forma paginada
   */
  async findAll(
    page: number,
    limit: number,
  ): Promise<Either<Error, PaginatedResult<User>>> {
    try {
      // Validar parámetros
      if (page < 1) {
        return Promise.resolve(left(new Error('Page must be greater than 0')));
      }
      if (limit < 1) {
        return Promise.resolve(left(new Error('Limit must be greater than 0')));
      }

      const total = this.users.length;
      const totalPages = Math.ceil(total / limit);

      // Calcular índices para paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // Obtener slice de usuarios
      const paginatedUsers = this.users.slice(startIndex, endIndex);

      // Convertir FakeUserData a entidades User
      const userEntities: User[] = [];
      for (const fakeUser of paginatedUsers) {
        const userOrError = this.toEntity(fakeUser);
        if (userOrError.isLeft()) {
          return Promise.resolve(left(userOrError.value));
        }
        userEntities.push(userOrError.value);
      }

      const result: PaginatedResult<User> = {
        data: userEntities,
        total,
        page,
        limit,
        totalPages,
      };

      return Promise.resolve(right(result));
    } catch (error) {
      return Promise.resolve(
        left(
          error instanceof Error
            ? error
            : new Error('Unknown error in findAll'),
        ),
      );
    }
  }

  /**
   * Busca un usuario por su ID
   */
  async findById(id: string): Promise<Either<UserNotFoundError, User>> {
    try {
      const fakeUser = this.users.find((u) => u.id === id);

      if (!fakeUser) {
        return Promise.resolve(left(new UserNotFoundError(id)));
      }

      const userOrError = this.toEntity(fakeUser);
      if (userOrError.isLeft()) {
        return Promise.resolve(left(new UserNotFoundError(id)));
      }

      return Promise.resolve(right(userOrError.value));
    } catch {
      return Promise.resolve(left(new UserNotFoundError(id)));
    }
  }

  /**
   * Cuenta el total de usuarios
   */
  async countAll(): Promise<number> {
    return Promise.resolve(this.users.length);
  }

  /**
   * Convierte FakeUserData a entidad User del dominio
   */
  private toEntity(fakeUser: FakeUserData): Either<ValidationError, User> {
    return User.create(
      fakeUser.id,
      fakeUser.username,
      fakeUser.phone,
      fakeUser.location.city,
      fakeUser.location.countryCode,
      fakeUser.communityMemberships,
    );
  }
}
