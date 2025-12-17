import { Entity } from "@app/ddd/entity";

// repositorio de entidades (identificadas)
export abstract class Repository<T extends Entity<any>> {
    abstract save(obj: T): Promise<void>;
    abstract findById(id: string): Promise<T>
    abstract remove(id: string): Promise<boolean>
}
