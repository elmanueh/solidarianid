import { Administrator } from '../../model/administrator';
import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

export abstract class AdministratorRepositoryPort extends Repository<Administrator> {
  abstract findByEmail(
    email: string,
  ): Promise<Either<RepositoryException, Administrator>>;

  abstract findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<Either<RepositoryException, Administrator>>;
}
