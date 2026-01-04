import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidCityError } from '@app/value-objects/errors/validation/city-validation-error';
import { CITY_MAX_LENGTH } from '@app/value-objects/constants/validation.constants';

export interface CityProps {
  value: string;
}

export class City extends ValueObject<CityProps> {
  private constructor(plainCity: string) {
    super({ value: plainCity });
  }

  get value(): string {
    return this.props.value;
  }

  public equals(other: City): boolean {
    return this.value === other.value;
  }

  public static create(city: string): Either<InvalidCityError, City> {
    // Validar que city no esté vacía
    if (!city || city.trim().length === 0) {
      return left(new InvalidCityError('City name cannot be empty.'));
    }

    // Validar longitud máxima de city
    if (city.length > CITY_MAX_LENGTH) {
      return left(new InvalidCityError(`City name must not exceed ${CITY_MAX_LENGTH} characters.`));
    }

    return right(new City(city));
  }
}
