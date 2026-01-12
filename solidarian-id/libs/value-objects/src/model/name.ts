import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from '../constants/validation.constants';
import { InvalidNameError } from '@app/value-objects/errors/validation/name-validation-error';

export interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  private constructor(plainName: string) {
    super({ value: plainName });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Name): boolean {
    return this.value === other.value;
  }

  public static create(plainName: string): Either<InvalidNameError, Name> {
    // Validar que no esté vacío
    if (!plainName || plainName.trim().length === 0) {
      return left(new InvalidNameError('Name cannot be empty.'));
    }

    // Validar longitud mínima
    if (plainName.length < NAME_MIN_LENGTH) {
      return left(new InvalidNameError(`Name must be at least ${NAME_MIN_LENGTH} characters long.`));
    }

    // Validar longitud máxima
    if (plainName.length > NAME_MAX_LENGTH) {
      return left(new InvalidNameError(`Name must not exceed ${NAME_MAX_LENGTH} characters.`));
    }

    return right(new Name(plainName));
  }
}
