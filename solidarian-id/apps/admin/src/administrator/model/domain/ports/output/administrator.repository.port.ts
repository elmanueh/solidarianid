import { InMemoryRepository } from '@app/ddd/repository/repository-inmemory';
import { Administrator } from '../../model/administrator';
import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class AdministratorRepositoryPort extends InMemoryRepository<Administrator> {
  abstract findByEmail(
    email: string,
  ): Promise<Either<RepositoryException, Administrator>>;

  abstract findByEmailAndHashedPassword(
    email: string,
    password: string,
  ): Promise<
    Either<RepositoryException | EntityNotFoundException, Administrator>
  >;
}
