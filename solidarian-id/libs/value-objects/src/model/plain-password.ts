import { ValueObject } from '@app/ddd/value-object';
import { Either, left, right } from '@app/ddd/either';
import { PasswordTooWeakError } from '@app/value-objects/errors/validation/password-validation-error';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_COMPLEXITY_REGEX,
} from '@app/value-objects/constants/validation.constants';

export interface PlainPasswordProps {
  value: string;
}

export type HasherFunction = (text: string) => Promise<string>;

export class PlainPassword extends ValueObject<PlainPasswordProps> {
  private constructor(plainPassword: string) {
    super({ value: plainPassword });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: PlainPassword): boolean {
    return this.value === other.value;
  }

  public static create(
    plainText: string,
  ): Either<PasswordTooWeakError, PlainPassword> {
    if (!plainText || plainText.length < PASSWORD_MIN_LENGTH) {
      return left(
        new PasswordTooWeakError(
          `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
        ),
      );
    }

    if (!PASSWORD_COMPLEXITY_REGEX.test(plainText)) {
      return left(
        new PasswordTooWeakError(
          'Password must include at least one uppercase letter, one number, and one special character.',
        ),
      );
    }

    return right(new PlainPassword(plainText));
  }
}
