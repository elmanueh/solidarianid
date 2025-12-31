import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { InvalidDescriptionError } from '@app/value-objects/errors/validation/description-validation-error';
import { Description } from '@app/value-objects/model/description';

interface EventProps {
  name: string;
  description: Description;
  dateTime: Date;
  place: string;
}

interface CreateEventProps {
  name: string;
  description: string;
  dateTime: Date;
  place: string;
}

export class Event extends ValueObject<EventProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): Description {
    return this.props.description;
  }

  get dateTime(): Date {
    return this.props.dateTime;
  }

  get place(): string {
    return this.props.place;
  }

  private constructor(props: EventProps) {
    super(props);
  }

  public static create(
    props: CreateEventProps,
  ): Either<InvalidDescriptionError, Event> {
    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const event = new Event({
      name: props.name,
      description: descriptionOrError.value,
      dateTime: props.dateTime,
      place: props.place,
    });

    return right(event);
  }
}
