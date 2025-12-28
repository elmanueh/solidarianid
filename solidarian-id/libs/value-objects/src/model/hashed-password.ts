import { ValueObject } from '@app/ddd/value-object';
import { Either, left, right } from '@app/ddd/either';
import { HASHED_PASSWORD_LONGITUDE } from '@app/value-objects/constants/validation.constants';
import { InvalidHashPasswordError } from '@app/value-objects/errors/validation/invalid-hash-password-error';

export interface HashedPasswordProps {
  value: string;
}

export class HashedPassword extends ValueObject<HashedPasswordProps> {
  private constructor(hash: string) {
    super({ value: hash });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: HashedPassword): boolean {
    return this.value === other.value;
  }

  public static create(
    hash: string,
  ): Either<InvalidHashPasswordError, HashedPassword> {
    if (!hash || hash.trim().length === 0) {
      return left(
        new InvalidHashPasswordError('A password hash can not be empty'),
      );
    }

    if (!HASHED_PASSWORD_LONGITUDE.test(hash)) {
      return left(
        new InvalidHashPasswordError('Hash does not have a reasonable length'),
      );
    }

    return right(new HashedPassword(hash));
  }
}
