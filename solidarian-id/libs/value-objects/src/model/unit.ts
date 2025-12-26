import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidUnitError } from '@app/value-objects/errors/validation/unit-validation-error';

export interface UnitProps {
  value: string;
}

export class Unit extends ValueObject<UnitProps> {
  private constructor(plainUnit: string) {
    super({ value: plainUnit });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Unit): boolean {
    return this.value === other.value;
  }

  public static create(plainUnit: string): Either<InvalidUnitError, Unit> {
    // Validar que no esté vacío
    if (!plainUnit || plainUnit.trim().length === 0) {
      return left(new InvalidUnitError('Unit cannot be empty.'));
    }

    return right(new Unit(plainUnit));
  }
}
