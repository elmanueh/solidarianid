import {
  CreateEventPlaceProps,
  EventPlace,
} from '@app/admin/administrator/model/domain/models/value-objects/event-place';
import { Either, left, right } from '@app/ddd/either';
import { ValueObject } from '@app/ddd/value-object';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface EventProps {
  name: Name;
  description: Description;
  initialDate: Date;
  place: EventPlace;
}

export interface CreateEventProps {
  name: string;
  description: string;
  initialDate: Date;
  place: CreateEventPlaceProps;
}

export interface ReconstituteEventProps {
  name: string;
  description: string;
  initialDate: Date;
  place: EventPlace;
}

export class Event extends ValueObject<EventProps> {
  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get initialDate(): Date {
    return this.props.initialDate;
  }

  get place(): EventPlace {
    return this.props.place;
  }

  private constructor(props: EventProps) {
    super(props);
  }

  public static create(props: CreateEventProps, id?: string): Either<ValidationError, Event> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const nameOrError = Name.create(props.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const eventPlaceOrError = EventPlace.create(props.place);
    if (eventPlaceOrError.isLeft()) return left(eventPlaceOrError.value);

    return right(
      new Event({
        name: nameOrError.value,
        description: descriptionOrError.value,
        initialDate: props.initialDate,
        place: eventPlaceOrError.value,
      }),
    );
  }

  public static reconstitute(props: ReconstituteEventProps, id?: string): Either<ValidationError, Event> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const nameOrError = Name.create(props.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    return right(
      new Event({
        name: nameOrError.value,
        description: descriptionOrError.value,
        initialDate: props.initialDate,
        place: props.place,
      }),
    );
  }
}
