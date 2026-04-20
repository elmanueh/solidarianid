export interface Indentificable {
  id: string;
}

export abstract class Repository<TEntity extends Indentificable, TKey = string> {
  abstract save(model: TEntity): Promise<void>;

  abstract saveAll(models: TEntity[]): Promise<void>;

  abstract remove(id: TKey): Promise<void>;

  abstract findById(id: TKey): Promise<TEntity | undefined>;

  abstract findAll(sort?: string): Promise<TEntity[]>;
}
