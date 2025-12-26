import { ValueObject } from '@app/ddd/value-object';
import { Either, right, left } from '@app/ddd/either';
import { InvalidCountryCodeError } from '@app/value-objects/errors/validation/country-code-validation-error';
import { InvalidCityError } from '@app/value-objects/errors/validation/city-validation-error';
import { City } from '@app/value-objects/model/city';
import { CountryCode } from '@app/value-objects/model/country-code';

export interface UserLocationProps {
  city: City;
  countryCode: CountryCode;
}

export interface UserLocationCreationProps {
  city: string;
  countryCode: string;
}

export class UserLocation extends ValueObject<UserLocationProps> {
  private constructor(props: UserLocationProps) {
    super(props);
  }

  get city(): string {
    return this.props.city.value;
  }

  get countryCode(): string {
    return this.props.countryCode.value;
  }

  public equals(other: UserLocation): boolean {
    return this.city === other.city && this.countryCode === other.countryCode;
  }

  public static create(
    props: UserLocationCreationProps,
  ): Either<InvalidCityError | InvalidCountryCodeError, UserLocation> {
    const city = City.create(props.city);
    const countryCodeResult = CountryCode.create(props.countryCode);

    if (city.isLeft()) return left(city.value);
    if (countryCodeResult.isLeft()) return left(countryCodeResult.value);

    const userLocationProps: UserLocationProps = {
      city: city.value,
      countryCode: countryCodeResult.value,
    };

    return right(new UserLocation(userLocationProps));
  }
}
