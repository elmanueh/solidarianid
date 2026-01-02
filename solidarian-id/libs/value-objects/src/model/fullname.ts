import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { FULLNAME_MIN_LENGTH, FULLNAME_MAX_LENGTH } from '../constants/validation.constants';
import { InvalidNameError } from '@app/value-objects/errors/validation/name-validation-error';

export interface FullNameProps {
  value: string;
}

export class FullName extends ValueObject<FullNameProps> {
  private constructor(plainName: string) {
    super({ value: plainName });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: FullName): boolean {
    return this.value === other.value;
  }

  public static create(plainName: string): Either<InvalidNameError, FullName> {
    // Validar que no esté vacío
    if (!plainName || plainName.trim().length === 0) {
      return left(new InvalidNameError('Name cannot be empty.'));
    }

    // Validar longitud mínima
    if (plainName.length < FULLNAME_MIN_LENGTH) {
      return left(new InvalidNameError(`Name must be at least ${FULLNAME_MIN_LENGTH} characters long.`));
    }

    // Validar longitud máxima
    if (plainName.length > FULLNAME_MAX_LENGTH) {
      return left(new InvalidNameError(`Name must not exceed ${FULLNAME_MAX_LENGTH} characters.`));
    }

    return right(new FullName(plainName));
  }
}
