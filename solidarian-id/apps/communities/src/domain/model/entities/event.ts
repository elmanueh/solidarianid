import { EventAlreadyJoinedError } from '@app/communities/domain/errors/event-already-joined.error';
import { EventAlreadyOccurredError } from '@app/communities/domain/errors/event-already-occurred.error';
import { EventNotJoinedError } from '@app/communities/domain/errors/event-not-joined.error';
import { User } from '@app/communities/domain/model/entities/user';
import { EventPlace } from '@app/communities/domain/model/value-objects/event-place';
import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

export interface EventProps {
  name: Name;
  description: Description;
  initialDate: Date;
  place: EventPlace;
  actionId: UniqueEntityID;
  assistants: User[];
}

interface EventCreationProps {
  name: string;
  description: string;
  initialDate: Date;
  place: EventPlace;
  actionId: string;
  assistants?: User[];
}

export class Event extends Entity<EventProps> {
  private constructor(props: EventProps, id?: UniqueEntityID) {
    super(props, id);
  }

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

  get actionId(): string {
    return this.props.actionId.value;
  }

  get assistants(): ReadonlyArray<User> {
    return this.props.assistants;
  }

  private hasOccurred(): boolean {
    return this.initialDate.getTime() <= Date.now();
  }

  private hasAssistant(user: User): boolean {
    return this.props.assistants.some(assistant => assistant.id.value === user.id.value);
  }

  joinAssistant(user: User): Either<ValidationError, void> {
    if (this.hasOccurred()) return left(new EventAlreadyOccurredError());
    if (this.hasAssistant(user)) return left(new EventAlreadyJoinedError());
    this.props.assistants.push(user);
    return right(undefined);
  }

  leaveAssistant(user: User): Either<ValidationError, void> {
    if (this.hasOccurred()) return left(new EventAlreadyOccurredError());
    if (!this.hasAssistant(user)) return left(new EventNotJoinedError());
    this.props.assistants = this.props.assistants.filter(assistant => assistant.id.value !== user.id.value);
    return right(undefined);
  }

  /**
   * Create an event.
   *
   * @return Either<InvalidNameError | InvalidDescriptionError | InvalidUniqueEntityIDError, Event>
   */
  public static create(props: EventCreationProps, id?: string): Either<ValidationError, Event> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const actionId = UniqueEntityID.create(props.actionId);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);
    if (actionId.isLeft()) return left(actionId.value);

    const eventProps: EventProps = {
      name: name.value,
      description: description.value,
      initialDate: props.initialDate,
      place: props.place,
      actionId: actionId.value,
      assistants: props.assistants || [],
    };

    return right(new Event(eventProps, uniqueId.value));
  }
}
