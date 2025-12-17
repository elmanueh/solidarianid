import { ValueObject } from '@app/ddd/value-object';
import { Either, left, right } from '@app/ddd/either';
import { InvalidUniqueEntityIDError } from '@app/value-objects/errors/validation/unique-entity-id-validation-error';
import { v4 as uuidv4, validate } from 'uuid';

export interface UniqueEntityIDProps {
  value: string;
}

export class UniqueEntityID extends ValueObject<UniqueEntityIDProps> {
  private constructor(id: string) {
    super({ value: id });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: UniqueEntityID): boolean {
    return this.value === other.value;
  }

  public static create(
    plainId?: string,
  ): Either<InvalidUniqueEntityIDError, UniqueEntityID> {
    const id = plainId ?? uuidv4();

    if (!validate(id)) {
      const error: InvalidUniqueEntityIDError = new InvalidUniqueEntityIDError(
        `Invalid UUID v4: ${id}`,
      );
      return left<InvalidUniqueEntityIDError, UniqueEntityID>(error);
    }

    return right(new UniqueEntityID(id));
  }
}
