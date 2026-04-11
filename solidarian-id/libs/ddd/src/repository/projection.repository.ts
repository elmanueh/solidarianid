import { Either } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class ProjectionRepository<TProjection> {
  abstract save(projection: Partial<TProjection>): Promise<Either<RepositoryException, void>>;

  abstract findOne(
    where: Partial<TProjection>,
  ): Promise<Either<RepositoryException | EntityNotFoundException, TProjection>>;
}
