import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

export abstract class Entity<T> {
  readonly id: UniqueEntityID;

  protected readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    if (id) {
      this.id = id;
    } else {
      const idResult = UniqueEntityID.create();
      if (idResult.isLeft()) {
        throw idResult.value;
      }
      this.id = idResult.value;
    }
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
