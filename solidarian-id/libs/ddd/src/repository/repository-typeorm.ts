import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { Mapper } from '@app/ddd/repository/mapper';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { ObjectLiteral, Repository as TypeOrmRepository } from 'typeorm';

export class RepositoryTypeORM<
  TDomain extends Entity<any>,
  TPersistence extends ObjectLiteral,
> extends Repository<TDomain> {
  constructor(
    private readonly repository: TypeOrmRepository<TPersistence>,
    private readonly mapper: Mapper<TDomain, TPersistence>,
  ) {
    super();
  }

  async save(model: TDomain): Promise<Either<RepositoryException, void>> {
    try {
      const entity = this.mapper.toPersistence(model);
      await this.repository.save(entity);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to save entity.', error));
    }
  }

  async remove(id: string): Promise<Either<RepositoryException, void>> {
    try {
      await this.repository.delete(id);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to remove entity.', error));
    }
  }

  async findById(
    id: string,
    relations?: string[],
  ): Promise<Either<RepositoryException | EntityNotFoundException, TDomain>> {
    try {
      const entity = await this.repository.findOne({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        where: { id } as any,
        relations,
      });
      if (!entity) {
        return left(new EntityNotFoundException('Entity', id));
      }

      const model = this.mapper.fromPersistence(entity);
      if (model.isLeft()) {
        return left(model.value);
      }
      return right(model.value);
    } catch (error) {
      return left(new RepositoryException(`Failed to find entity by id ${id}. Error: ${error}`));
    }
  }

  async findAll(relations?: string[]): Promise<Either<RepositoryException | EntityNotFoundException, TDomain[]>> {
    try {
      const entities = await this.repository.find({ relations });
      if (entities.length === 0) {
        return left(new EntityNotFoundException('Entity', 'all'));
      }

      const models = entities.map(entity => this.mapper.fromPersistence(entity));
      const lefts = models.filter(m => m.isLeft());
      if (lefts.length > 0) {
        return left(lefts[0].value);
      }

      const rights = models.filter(m => m.isRight()) as Array<Either<never, TDomain>>;

      const domainModels = rights.map(r => r.value);
      return right(domainModels);
    } catch (error) {
      return left(new RepositoryException('Failed to find entities.', error));
    }
  }
}
