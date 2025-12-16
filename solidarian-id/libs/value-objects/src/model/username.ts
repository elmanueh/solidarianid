import { ValueObject } from '@app/ddd/value-object';
import { Either, right } from '@app/ddd/either';
import { InvalidUsernameError } from '@app/value-objects/errors/validation/username-validation-error';

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
    return right(new Username(plainUsername));
  }
}
