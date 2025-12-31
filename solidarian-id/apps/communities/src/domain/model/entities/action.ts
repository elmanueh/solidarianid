import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Objective } from './objective';
import { Event } from './event';

export interface ActionProps {
  name: Name;
  description: Description;
  objectives: Objective[];
  events: Event[];
  causeId: UniqueEntityID;
}

interface ActionCreationProps {
  name: string;
  description: string;
  objectives: Objective[];
  events: Event[];
  causeId: string;
}

export class Action extends Entity<ActionProps> {
  private constructor(props: ActionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get objectives(): ReadonlyArray<Objective> {
    return this.props.objectives;
  }

  get events(): ReadonlyArray<Event> {
    return this.props.events;
  }

  get causeId(): string {
    return this.props.causeId.value;
  }

  addObjective(objective: Objective): void {
    this.props.objectives.push(objective);
  }

  addEvent(event: Event): void {
    this.props.events.push(event);
  }

  /**
   * Create an action.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidNameError | InvalidDescriptionError, Action>
   */
  public static create(
    props: ActionCreationProps,
    id?: string,
  ): Either<ValidationError, Action> {
    const uniqueId = UniqueEntityID.create(id);
    const name = Name.create(props.name);
    const description = Description.create(props.description);
    const causeId = UniqueEntityID.create(props.causeId);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (name.isLeft()) return left(name.value);
    if (description.isLeft()) return left(description.value);
    if (causeId.isLeft()) return left(causeId.value);

    const actionProps: ActionProps = {
      name: name.value,
      description: description.value,
      objectives: props.objectives,
      events: props.events,
      causeId: causeId.value,
    };

    return right(new Action(actionProps, uniqueId.value));
  }
}
