import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { City } from '@app/value-objects/model/city';
import { CountryCode } from '@app/value-objects/model/country-code';
import { Direction } from '@app/value-objects/model/direction';

export interface EventPlaceProps {
  direction: Direction;
  city: City;
  countryCode: CountryCode;
}

export interface EventPlaceCreateProps {
  direction: string;
  city: string;
  countryCode: string;
}

export class EventPlace extends ValueObject<EventPlaceProps> {
  private constructor(props: EventPlaceProps) {
    super(props);
  }

  get direction(): string {
    return this.props.direction.value;
  }

  get city(): string {
    return this.props.city.value;
  }

  get countryCode(): string {
    return this.props.countryCode.value;
  }

  /**
   * Create a place.
   *
   * @return Either<InvalidDirectionError | InvalidCityError | InvalidCountryCodeError, Place>
   */
  public static create(
    props: EventPlaceCreateProps,
  ): Either<ValidationError, EventPlace> {
    const direction = Direction.create(props.direction);
    const city = City.create(props.city);
    const countryCode = CountryCode.create(props.countryCode);

    if (direction.isLeft()) return left(direction.value);
    if (city.isLeft()) return left(city.value);
    if (countryCode.isLeft()) return left(countryCode.value);

    const placeProps: EventPlaceProps = {
      direction: direction.value,
      city: city.value,
      countryCode: countryCode.value,
    };

    return right(new EventPlace(placeProps));
  }
}
