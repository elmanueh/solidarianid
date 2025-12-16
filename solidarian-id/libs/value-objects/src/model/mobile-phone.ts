import { ValueObject } from '@app/ddd/value-object';
import { Either, right } from '@app/ddd/either';
import { InvalidMobilePhoneError } from '@app/value-objects/errors/validation/mobile-phone-validation-error';

export interface MobilePhoneProps {
  value: string;
}

export class MobilePhone extends ValueObject<MobilePhoneProps> {
  private constructor(plainPhone: string) {
    super({ value: plainPhone });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: MobilePhone): boolean {
    return this.value === other.value;
  }

  public static create(
    plainPhone: string,
  ): Either<InvalidMobilePhoneError, MobilePhone> {
    return right(new MobilePhone(plainPhone));
  }
}
