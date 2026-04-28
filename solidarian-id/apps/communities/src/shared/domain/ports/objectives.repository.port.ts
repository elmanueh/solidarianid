import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class ObjectivesRepositoryPort {
  abstract findAllObjectiveIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>>;
}
