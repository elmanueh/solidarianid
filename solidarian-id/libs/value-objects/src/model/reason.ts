import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { REASON_MAX_LENGTH } from '../constants/validation.constants';
import { InvalidDescriptionError } from '@app/value-objects/errors/validation/description-validation-error';

export interface ReasonProps {
  value: string;
}

export class Reason extends ValueObject<ReasonProps> {
  private constructor(plainDescription: string) {
    super({ value: plainDescription });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Reason): boolean {
    return this.value === other.value;
  }

  public static create(
    plainReason?: string,
  ): Either<InvalidDescriptionError, Reason> {
    // Validar longitud máxima
    if (!plainReason || plainReason.trim().length === 0) {
      return right(new Reason(''));
    }
    if (plainReason.length > REASON_MAX_LENGTH) {
      return left(
        new InvalidDescriptionError(
          `Reason must not exceed ${REASON_MAX_LENGTH} characters.`,
        ),
      );
    }

    return right(new Reason(plainReason));
  }
}
