import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';

export abstract class InMemoryRepository<
  T extends Entity<any>,
> extends Repository<T> {
  protected readonly items: Map<string, T>;

  constructor() {
    super();
    this.items = new Map<string, T>();
  }

  save(model: T): Promise<Either<RepositoryException, void>> {
    this.items.set(model.id.value, model);
    return Promise.resolve(right(undefined));
  }
  remove(id: string): Promise<Either<RepositoryException, void>> {
    this.items.delete(id);
    return Promise.resolve(right(undefined));
  }
  findById(
    id: string,
  ): Promise<Either<RepositoryException | EntityNotFoundException, T>> {
    const item = this.items.get(id);
    if (!item) {
      return Promise.resolve(left(new EntityNotFoundException('Entity', id)));
    }
    return Promise.resolve(right(item));
  }
  findAll(): Promise<
    Either<RepositoryException | EntityNotFoundException, T[]>
  > {
    const allItems = Array.from(this.items.values());
    return Promise.resolve(right(allItems));
  }
}
