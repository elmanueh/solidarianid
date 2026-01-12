import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidDirectionError } from '@app/value-objects/errors/validation/direction-validation-error';

export interface DirectionProps {
  value: string;
}

export class Direction extends ValueObject<DirectionProps> {
  private constructor(plainDirection: string) {
    super({ value: plainDirection });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Direction): boolean {
    return this.value === other.value;
  }

  public static create(plainDirection: string): Either<InvalidDirectionError, Direction> {
    // Validar que no esté vacío
    if (!plainDirection || plainDirection.trim().length === 0) {
      return left(new InvalidDirectionError('Direction cannot be empty.'));
    }

    return right(new Direction(plainDirection));
  }
}
