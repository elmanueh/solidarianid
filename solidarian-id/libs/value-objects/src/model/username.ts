import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidUsernameError } from '@app/value-objects/errors/validation/username-validation-error';
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
} from '../constants/validation.constants';

export interface UsernameProps {
  value: string;
}

export class Username extends ValueObject<UsernameProps> {
  private constructor(plainUsername: string) {
    super({ value: plainUsername });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Username): boolean {
    return this.value === other.value;
  }

  public static create(
    plainUsername: string,
  ): Either<InvalidUsernameError, Username> {
    // Validar que no esté vacío
    if (!plainUsername || plainUsername.trim().length === 0) {
      return left(new InvalidUsernameError('Username cannot be empty.'));
    }

    // Validar longitud mínima
    if (plainUsername.length < USERNAME_MIN_LENGTH) {
      return left(
        new InvalidUsernameError(
          `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
        ),
      );
    }

    // Validar longitud máxima
    if (plainUsername.length > USERNAME_MAX_LENGTH) {
      return left(
        new InvalidUsernameError(
          `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
        ),
      );
    }

    // Validar que solo contenga letras y números (alfanumérico)
    if (!USERNAME_REGEX.test(plainUsername)) {
      return left(
        new InvalidUsernameError(
          'Username must contain only letters and numbers.',
        ),
      );
    }

    return right(new Username(plainUsername));
  }
}
