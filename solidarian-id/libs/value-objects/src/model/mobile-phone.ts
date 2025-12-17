import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidMobilePhoneError } from '@app/value-objects/errors/validation/mobile-phone-validation-error';
import { MOBILE_PHONE_REGEX } from '../constants/validation.constants';

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
    // Validar que no esté vacío
    if (!plainPhone || plainPhone.trim().length === 0) {
      return left(
        new InvalidMobilePhoneError('Mobile phone number cannot be empty.'),
      );
    }

    // Validar formato E.164: +[1-3 dígitos código país][9 dígitos]
    // La regex ya valida implícitamente la longitud (11-13 caracteres)
    if (!MOBILE_PHONE_REGEX.test(plainPhone)) {
      return left(
        new InvalidMobilePhoneError(
          'Mobile phone number must be in E.164 format: +[country code][9 digits] (e.g., +34612345678).',
        ),
      );
    }

    return right(new MobilePhone(plainPhone));
  }
}
