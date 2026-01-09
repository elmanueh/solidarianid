import {
  CreateRequestProps,
  ReconstituteRequestProps,
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Either, left, right, sequence } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestInvalidStatusError } from '@app/admin/administrator/model/domain/errors/invalid-status.request-error';
import { InvalidUniqueEntityIDError } from '@app/value-objects/errors/validation/unique-entity-id-validation-error';
import { InvalidDescriptionError } from '@app/value-objects/errors/validation/description-validation-error';
import { Reason } from '@app/value-objects/model/reason';
import {
  CreateObjectiveProps,
  Objective,
  ReconstituteObjectiveProps,
} from '@app/admin/administrator/model/domain/value-objects/objective';
import {
  CreateEventProps,
  Event,
  ReconstituteEventProps,
} from '@app/admin/administrator/model/domain/value-objects/event';
import { RequestError } from '@app/admin/administrator/model/domain/errors/request-error';

interface ActionRequestProps extends RequestProps {
  objectives: Objective[];
  events: Event[];
  causeId: UniqueEntityID;
}

export interface CreateActionRequestProps extends CreateRequestProps {
  objectives: CreateObjectiveProps[];
  events: CreateEventProps[];
  causeId: string;
}

export interface ReconstituteActionRequestProps extends ReconstituteRequestProps {
  objectives: ReconstituteObjectiveProps[];
  events: ReconstituteEventProps[];
  causeId: string;
}

export class ActionRequest extends Request<ActionRequestProps> {
  get objectives(): ReadonlyArray<Objective> {
    return this.props.objectives;
  }

  get events(): ReadonlyArray<Event> {
    return this.props.events;
  }

  get causeId(): string {
    return this.props.causeId.value;
  }

  private constructor(props: ActionRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CreateActionRequestProps,
    id?: string,
  ): Either<InvalidUniqueEntityIDError | InvalidDescriptionError, ActionRequest> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const causeIdOrError = UniqueEntityID.create(props.causeId);
    if (causeIdOrError.isLeft()) return left(causeIdOrError.value);

    const objectivesOrError = sequence(
      props.objectives.map(objective =>
        Objective.create({
          name: objective.name,
          description: objective.description,
          quantity: objective.quantity,
          unit: objective.unit,
        }),
      ),
    );

    if (objectivesOrError.isLeft()) return left(objectivesOrError.value);

    const eventsOrError = sequence(
      props.events.map(event =>
        Event.create({
          name: event.name,
          description: event.description,
          initialDate: event.initialDate,
          place: event.place,
        }),
      ),
    );

    if (eventsOrError.isLeft()) return left(eventsOrError.value);

    const actionRequest = new ActionRequest(
      {
        name: props.name,
        description: descriptionOrError.value,
        status: RequestStatus.PENDING,
        userId: props.userId,
        objectives: objectivesOrError.value,
        events: eventsOrError.value,
        causeId: causeIdOrError.value,
      },
      idOrError.value,
    );

    return right(actionRequest);
  }

  public static reconstitute(
    props: ReconstituteActionRequestProps,
  ): Either<InvalidUniqueEntityIDError | InvalidDescriptionError, ActionRequest> {
    const idOrError = UniqueEntityID.create(props.id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const reasonOrError = Reason.create(props.reason);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);

    const causeIdOrError = UniqueEntityID.create(props.causeId);
    if (causeIdOrError.isLeft()) return left(causeIdOrError.value);

    const objectivesOrError = sequence(
      props.objectives.map(objective =>
        Objective.reconstitute({
          name: objective.name,
          description: objective.description,
          quantity: objective.quantity,
          unit: objective.unit,
          currentAmount: objective.currentAmount,
        }),
      ),
    );

    if (objectivesOrError.isLeft()) return left(objectivesOrError.value);

    const eventsOrError = sequence(
      props.events.map(event =>
        Event.reconstitute({
          name: event.name,
          description: event.description,
          initialDate: event.initialDate,
          place: event.place,
        }),
      ),
    );

    if (eventsOrError.isLeft()) return left(eventsOrError.value);

    return right(
      new ActionRequest(
        {
          name: props.name,
          description: descriptionOrError.value,
          status: props.status as RequestStatus,
          reason: reasonOrError.value,
          userId: props.userId,
          objectives: objectivesOrError.value,
          events: eventsOrError.value,
          causeId: causeIdOrError.value,
        },
        idOrError.value,
      ),
    );
  }

  public approve(reason?: string): Either<RequestInvalidStatusError, void> {
    const reasonOrError = Reason.create(reason);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);

    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestInvalidStatusError('Action request has already been resolved.', this.id.value));
    }

    this.props.status = RequestStatus.APPROVED;
    if (reason) this.props.reason = reasonOrError.value;
    return right(undefined);
  }

  public reject(reason: string): Either<RequestInvalidStatusError | RequestError, void> {
    if (!reason) {
      return left(new RequestError('Rejection reason must be provided'));
    }

    const reasonOrError = Reason.create(reason);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);

    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestInvalidStatusError('Action request has already been resolved.', this.id.value));
    }

    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reasonOrError.value;
    return right(undefined);
  }
}
