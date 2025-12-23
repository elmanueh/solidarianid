import { ValueObject } from '@app/ddd/value-object';
import { Either, left, right } from '@app/ddd/either';
import { HASH_REGEX } from '@app/value-objects/constants/validation.constants';
import { InvalidHashPasswordError } from '../errors/validation/invalid-hash-password-error';

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
      return left(new InvalidHashPasswordError('Empty hash'));
    }

    if (!HASH_REGEX.test(hash)) {
      return left(new InvalidHashPasswordError('Not a bcrypt hash'));
    }

    const cost = Number(hash.split('$')[2]);
    if (Number.isNaN(cost)) {
      return left(new InvalidHashPasswordError('Invalid bcrypt cost factor'));
    }

    return right(new HashedPassword(hash));
  }
}
