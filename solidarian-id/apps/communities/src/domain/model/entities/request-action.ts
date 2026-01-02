import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { Quantity } from '@app/value-objects/model/quantity';
import { Unit } from '@app/value-objects/model/unit';
import { RequestProps, Request, RequestCreationProps } from './request';
import { EventPlace } from '../value-objects/event-place';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Either, left, right, sequence } from '@app/ddd/either';
import { Reason } from '@app/value-objects/model/reason';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export interface ActionRequestObjectiveProps {
  name: Name;
  description: Description;
  quantity: Quantity;
  unit: Unit;
}

export interface ActionRequestCreationObjectiveProps {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface ActionRequestEventProps {
  name: string;
  description: string;
  initialDate: Date;
  place: EventPlace;
}

export interface ActionRequestCreationEventProps {
  name: string;
  description: string;
  initialDate: Date;
  place: {
    direction: string;
    city: string;
    countryCode: string;
  };
}

export interface ActionRequestProps extends RequestProps {
  objectives: ActionRequestObjectiveProps[];
  events: ActionRequestEventProps[];
}

export interface ActionCreationProps extends RequestCreationProps {
  objectives: ActionRequestCreationObjectiveProps[];
  events: ActionRequestCreationEventProps[];
}

export class ActionRequest extends Request<ActionRequestProps> {
  private constructor(props: ActionRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get objectives(): ReadonlyArray<ActionRequestObjectiveProps> {
    return this.props.objectives;
  }

  get events(): ReadonlyArray<ActionRequestEventProps> {
    return this.props.events;
  }

  addObjective(objective: ActionRequestObjectiveProps): void {
    this.props.objectives.push(objective);
  }

  addEvent(event: ActionRequestEventProps): void {
    this.props.events.push(event);
  }

  public static create(props: ActionCreationProps, id?: string): Either<ValidationError, ActionRequest> {
    const { name, status, user, description, reason, events, objectives } = props;

    const uniqueId = UniqueEntityID.create(id);
    const nameOrError = Name.create(name);
    const descriptionOrError = Description.create(description);
    const reasonOrError = Reason.create(reason);
    const objectivesOrError = sequence(objectives.map(objective => ActionRequest.validateObjective(objective)));
    const eventsOrError = sequence(events.map(event => ActionRequest.validateEvent(event)));

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);
    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    if (objectivesOrError.isLeft()) return left(objectivesOrError.value);
    if (eventsOrError.isLeft()) return left(eventsOrError.value);

    const requestProps: ActionRequestProps = {
      name: nameOrError.value,
      description: descriptionOrError.value,
      status,
      user,
      reason: reasonOrError.value,
      objectives: objectivesOrError.value,
      events: eventsOrError.value,
    };

    return right(new ActionRequest(requestProps, uniqueId.value));
  }

  private static validateObjective(
    objective: ActionRequestCreationObjectiveProps,
  ): Either<ValidationError, ActionRequestObjectiveProps> {
    const objNameOrError = Name.create(objective.name);
    const objDescriptionOrError = Description.create(objective.description);
    const quantityOrError = Quantity.create(objective.quantity);
    const unitOrError = Unit.create(objective.unit);

    if (objNameOrError.isLeft()) return left(objNameOrError.value);
    if (objDescriptionOrError.isLeft()) return left(objDescriptionOrError.value);
    if (quantityOrError.isLeft()) return left(quantityOrError.value);
    if (unitOrError.isLeft()) return left(unitOrError.value);

    return right({
      name: objNameOrError.value,
      description: objDescriptionOrError.value,
      quantity: quantityOrError.value,
      unit: unitOrError.value,
    });
  }

  private static validateEvent(
    event: ActionRequestCreationEventProps,
  ): Either<ValidationError, ActionRequestEventProps> {
    const eventNameOrError = Name.create(event.name);
    const eventDescriptionOrError = Description.create(event.description);
    const placeOrError = EventPlace.create({
      direction: event.place.direction,
      city: event.place.city,
      countryCode: event.place.countryCode,
    });

    if (eventNameOrError.isLeft()) return left(eventNameOrError.value);
    if (eventDescriptionOrError.isLeft()) return left(eventDescriptionOrError.value);
    if (placeOrError.isLeft()) return left(placeOrError.value);

    return right({
      name: eventNameOrError.value.value,
      description: eventDescriptionOrError.value.value,
      initialDate: event.initialDate,
      place: placeOrError.value,
    });
  }
}
