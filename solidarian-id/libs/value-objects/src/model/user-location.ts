import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidCountryCodeError } from '@app/value-objects/errors/validation/country-code-validation-error';
import { InvalidCityError } from '@app/value-objects/errors/validation/city-validation-error';
import {
  CITY_MAX_LENGTH,
  COUNTRY_CODE_REGEX,
} from '../constants/validation.constants';

export interface UserLocationProps {
  city: string;
  countryCode: string;
}

export class UserLocation extends ValueObject<UserLocationProps> {
  private constructor(city: string, countryCode: string) {
    super({ city, countryCode });
  }

  get city(): string {
    return this.props.city;
  }

  get countryCode(): string {
    return this.props.countryCode;
  }

  public equals(other: UserLocation): boolean {
    return this.city === other.city && this.countryCode === other.countryCode;
  }

  public static create(
    city: string,
    countryCode: string,
  ): Either<InvalidCityError | InvalidCountryCodeError, UserLocation> {
    // Validar que city no esté vacía
    if (!city || city.trim().length === 0) {
      return left(new InvalidCityError('City name cannot be empty.'));
    }

    // Validar longitud máxima de city
    if (city.length > CITY_MAX_LENGTH) {
      return left(
        new InvalidCityError(
          `City name must not exceed ${CITY_MAX_LENGTH} characters.`,
        ),
      );
    }

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

    return right(new UserLocation(city, countryCode));
  }
}
