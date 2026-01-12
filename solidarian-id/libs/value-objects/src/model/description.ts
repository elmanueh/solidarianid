import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH } from '../constants/validation.constants';
import { InvalidDescriptionError } from '@app/value-objects/errors/validation/description-validation-error';

export interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  private constructor(plainDescription: string) {
    super({ value: plainDescription });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Description): boolean {
    return this.value === other.value;
  }

  public static create(plainDescription: string): Either<InvalidDescriptionError, Description> {
    // Validar que no esté vacío
    if (!plainDescription || plainDescription.trim().length === 0) {
      return left(new InvalidDescriptionError('Description cannot be empty.'));
    }

    // Validar longitud mínima
    if (plainDescription.length < DESCRIPTION_MIN_LENGTH) {
      return left(
        new InvalidDescriptionError(`Description must be at least ${DESCRIPTION_MIN_LENGTH} characters long.`),
      );
    }

    // Validar longitud máxima
    if (plainDescription.length > DESCRIPTION_MAX_LENGTH) {
      return left(new InvalidDescriptionError(`Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters.`));
    }

    return right(new Description(plainDescription));
  }
}
