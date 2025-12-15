import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<T> {
  readonly id: UniqueEntityID;

  protected readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this.id = id ?? UniqueEntityID.create();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null) {
      return false;
    }
    if (this === object) {
      return true;
    }

    return this.id.equals(object.id);
  }
}
