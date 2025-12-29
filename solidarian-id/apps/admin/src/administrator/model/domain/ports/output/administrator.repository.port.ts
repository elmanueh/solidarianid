import { Either } from '@app/ddd/either';
import { Administrator } from '../../models/administrator';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

export abstract class AdministratorRepositoryPort extends Repository<Administrator> {
  abstract findByEmail(
    email: string,
  ): Promise<Either<RepositoryException, Administrator>>;
}
