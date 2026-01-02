import { EventPlace } from '@app/communities/actions/domain/model/value-objects/event-place';
import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';

export interface EventProps {
  name: Name;
  description: Description;
  date: Date;
  place: EventPlace;
}

interface EventCreationProps {
  name: string;
  description: string;
  date: Date;
  place: EventPlace;
}

export class Event extends ValueObject<EventProps> {
  private constructor(props: EventProps) {
    super(props);
  }

  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get date(): Date {
    return this.props.date;
  }

  get place(): EventPlace {
    return this.props.place;
  }

  /**
   * Create an event.
   *
   * @return Either<InvalidNameError | InvalidDescriptionError, Event>
   */
  public static create(props: EventCreationProps): Either<ValidationError, Event> {
    const name = Name.create(props.name);
    const description = Description.create(props.description);

    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);

    const eventProps: EventProps = {
      name: name.value,
      description: description.value,
      date: props.date,
      place: props.place,
    };

    return right(new Event(eventProps));
  }
}
