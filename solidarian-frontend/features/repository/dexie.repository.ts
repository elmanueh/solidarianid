import { Indentificable, Repository } from '@/features/repository/repository';
import { Table } from 'dexie';

export type SortDirection = 'asc' | 'desc';

export type QueryOptions<TEntity> = {
  filter?: Partial<TEntity>;
  sortBy?: keyof TEntity & string;
  sortDirection?: SortDirection;
  offset?: number;
  limit?: number;
};

export type PaginatedResult<TEntity> = {
  items: TEntity[];
  total: number;
  offset: number;
  limit: number;
};

export class DexieRepository<TEntity extends Indentificable, TKey = string> extends Repository<TEntity, TKey> {
  constructor(protected readonly table: Table<TEntity, TKey>) {
    super();
  }

  async save(model: TEntity): Promise<void> {
    await this.table.put(model);
  }

  async saveAll(models: TEntity[]): Promise<void> {
    await this.table.bulkPut(models);
  }

  async remove(id: TKey): Promise<void> {
    await this.table.delete(id);
  }

  async findById(id: TKey): Promise<TEntity | undefined> {
    return this.table.get(id);
  }

  async findAll(sort?: string): Promise<TEntity[]> {
    if (sort) {
      return this.table.orderBy(sort).toArray();
    }
    return this.table.toArray();
  }

  async query(options: QueryOptions<TEntity> = {}): Promise<TEntity[]> {
    const { filter, sortBy, sortDirection = 'asc', offset = 0, limit } = options;

    let items = await this.table.toArray();

    if (filter) {
      items = items.filter(item =>
        Object.entries(filter).every(([key, value]) => (item as Record<string, unknown>)[key] === value)
      );
    }

    if (sortBy) {
      items = [...items].sort((a, b) => {
        const left = (a as Record<string, unknown>)[sortBy];
        const right = (b as Record<string, unknown>)[sortBy];

        if (left === right) {
          return 0;
        }

        if (left === undefined || left === null) {
          return 1;
        }

        if (right === undefined || right === null) {
          return -1;
        }

        if (left > right) {
          return sortDirection === 'asc' ? 1 : -1;
        }

        return sortDirection === 'asc' ? -1 : 1;
      });
    }

    if (limit === undefined) {
      return items.slice(offset);
    }

    return items.slice(offset, offset + limit);
  }

  async paginate(options: QueryOptions<TEntity> = {}): Promise<PaginatedResult<TEntity>> {
    const offset = options.offset ?? 0;
    const limit = options.limit ?? 20;
    const items = await this.query({ ...options, offset, limit });
    const total = (await this.query({ ...options, offset: 0, limit: undefined })).length;

    return {
      items,
      total,
      offset,
      limit,
    };
  }
}
