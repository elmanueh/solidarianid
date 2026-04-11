import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ProjectionRepository } from '@app/ddd/repository/projection.repository';
import { FindOptionsWhere, ObjectLiteral, Repository as TypeOrmRepository } from 'typeorm';

export class ProjectionRepositoryTypeOrm<TProjection extends ObjectLiteral> extends ProjectionRepository<TProjection> {
  constructor(protected readonly repository: TypeOrmRepository<TProjection>) {
    super();
  }

  async save(projection: Partial<TProjection>): Promise<Either<RepositoryException, void>> {
    try {
      await this.repository.save(projection as TProjection);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to save projection entity.', error));
    }
  }

  async findOne(
    where: Partial<TProjection>,
  ): Promise<Either<RepositoryException | EntityNotFoundException, TProjection>> {
    try {
      const entity = await this.repository.findOne({
        where: where as FindOptionsWhere<TProjection>,
      });

      if (!entity) {
        return left(new EntityNotFoundException('Projection entity not found.'));
      }

      return right(entity);
    } catch (error) {
      return left(new RepositoryException(`Failed to find projection entity. Error: ${error}`));
    }
  }
}
