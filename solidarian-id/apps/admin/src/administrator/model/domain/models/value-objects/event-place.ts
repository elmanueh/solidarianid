import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { City } from '@app/value-objects/model/city';
import { CountryCode } from '@app/value-objects/model/country-code';
import { Direction } from '@app/value-objects/model/direction';

interface EventPlaceProps {
  direction: Direction;
  city: City;
  countryCode: CountryCode;
}

export interface CreateEventPlaceProps {
  direction: string;
  city: string;
  countryCode: string;
}

export interface ReconstituteEventPlaceProps {
  direction: string;
  city: string;
  countryCode: string;
}

export class EventPlace extends ValueObject<EventPlaceProps> {
  get direction(): string {
    return this.props.direction.value;
  }

  get city(): string {
    return this.props.city.value;
  }

  get countryCode(): string {
    return this.props.countryCode.value;
  }

  private constructor(props: EventPlaceProps) {
    super(props);
  }

  public static create(props: CreateEventPlaceProps): Either<ValidationError, EventPlace> {
    const directionOrError = Direction.create(props.direction);
    if (directionOrError.isLeft()) return left(directionOrError.value);

    const cityOrError = City.create(props.city);
    if (cityOrError.isLeft()) return left(cityOrError.value);

    const countryCodeOrError = CountryCode.create(props.countryCode);
    if (countryCodeOrError.isLeft()) return left(countryCodeOrError.value);

    return right(
      new EventPlace({
        direction: directionOrError.value,
        city: cityOrError.value,
        countryCode: countryCodeOrError.value,
      }),
    );
  }

  public static reconstitute(props: ReconstituteEventPlaceProps): Either<ValidationError, EventPlace> {
    const directionOrError = Direction.create(props.direction);
    if (directionOrError.isLeft()) return left(directionOrError.value);

    const cityOrError = City.create(props.city);
    if (cityOrError.isLeft()) return left(cityOrError.value);

    const countryCodeOrError = CountryCode.create(props.countryCode);
    if (countryCodeOrError.isLeft()) return left(countryCodeOrError.value);

    return right(
      new EventPlace({
        direction: directionOrError.value,
        city: cityOrError.value,
        countryCode: countryCodeOrError.value,
      }),
    );
  }
}
