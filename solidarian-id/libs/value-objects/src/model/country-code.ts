import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidCountryCodeError } from '@app/value-objects/errors/validation/country-code-validation-error';
import { COUNTRY_CODE_REGEX } from '@app/value-objects/constants/validation.constants';

export interface CountryCodeProps {
  value: string;
}

export class CountryCode extends ValueObject<CountryCodeProps> {
  private constructor(plainCountryCode: string) {
    super({ value: plainCountryCode });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: CountryCode): boolean {
    return this.value === other.value;
  }

  public static create(
    countryCode: string,
  ): Either<InvalidCountryCodeError, CountryCode> {
    // Validar que no esté vacío
    // Validar que countryCode no esté vacío
    if (!countryCode || countryCode.trim().length === 0) {
      return left(new InvalidCountryCodeError('Country code cannot be empty.'));
    }

    // Validar formato ISO 3166-1 alpha-2 (exactamente 2 letras mayúsculas)
    // La regex ya valida implícitamente la longitud
    if (!COUNTRY_CODE_REGEX.test(countryCode)) {
      return left(
        new InvalidCountryCodeError(
          'Country code must be a valid ISO 3166-1 alpha-2 code (e.g., ES, US, MX).',
        ),
      );
    }

    return right(new CountryCode(countryCode));
  }
}
