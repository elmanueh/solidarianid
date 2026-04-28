import { ActionEventNotFoundError } from '@app/communities/shared/domain/errors/action-event-not-found.error';
import { ActionObjectiveNotFoundError } from '@app/communities/shared/domain/errors/action-objective-not-found.error';
import { ActionCreatedEvent } from '@app/communities/shared/domain/events/action-created.event';
import { Event } from '@app/communities/shared/domain/model/entities/event';
import { User } from '@app/communities/shared/domain/model/entities/user';
import { Objective } from '@app/communities/shared/domain/model/value-objects/objective';
import { AggregateRoot } from '@app/ddd/aggregate-root';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

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

export class Action extends AggregateRoot<ActionProps> {
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

  joinEvent(eventId: string, user: User): Either<ValidationError, void> {
    const event = this.props.events.find(event => event.id.value === eventId);
    if (!event) return left(new ActionEventNotFoundError(eventId, this.id.value));

    return event.joinAssistant(user);
  }

  leaveEvent(eventId: string, user: User): Either<ValidationError, void> {
    const event = this.props.events.find(event => event.id.value === eventId);
    if (!event) return left(new ActionEventNotFoundError(eventId, this.id.value));

    return event.leaveAssistant(user);
  }

  contributeObjective(objectiveName: string, user: User, amount: number): Either<ValidationError, Objective> {
    const objective = this.props.objectives.find(objective => objective.name === objectiveName);
    if (!objective) return left(new ActionObjectiveNotFoundError(objectiveName, this.id.value));

    const contributeResult = objective.contribute(user, amount);
    if (contributeResult.isLeft()) return left(contributeResult.value);
    const updatedObjective = contributeResult.value;

    const objectiveIndex = this.props.objectives.findIndex(obj => obj.name === objectiveName);
    this.props.objectives[objectiveIndex] = updatedObjective;

    return right(updatedObjective);
  }

  /**
   * Create an action.
   *
   * @return Either<InvalidUniqueEntityIDError | InvalidNameError | InvalidDescriptionError, Action>
   */
  public static create(props: ActionCreationProps, id?: string): Either<ValidationError, Action> {
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

    const action = new Action(actionProps, uniqueId.value);
    action.addDomainEvent(new ActionCreatedEvent(action));

    return right(action);
  }
}
