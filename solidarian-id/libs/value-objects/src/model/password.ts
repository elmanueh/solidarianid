import { ValueObject } from '@app/ddd/value-object';
import { Either, right } from '@app/ddd/either';
import { InvalidPasswordError } from '@app/value-objects/errors/validation/password-validation-error';

export interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(plainPassword: string) {
    super({ value: plainPassword });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: Password): boolean {
    return this.value === other.value;
  }

  public static create(
    plainPassword: string,
  ): Either<InvalidPasswordError, Password> {
    return right(new Password(plainPassword));
  }
}
