import {
  CreateRequestProps,
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Either, left, right } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { QuantifiableObjective } from '@app/value-objects/model/quantifiable-objective';
import { Event } from '@app/value-objects/model/event';
import { InvalidUniqueEntityIDError } from '@app/value-objects/errors/validation/unique-entity-id-validation-error';
import { InvalidDescriptionError } from '@app/value-objects/errors/validation/description-validation-error';
import { RequestError } from '@app/value-objects/errors/validation/request-validation.error';

interface ActionRequestProps extends RequestProps {
  objectives: QuantifiableObjective[];
  events: Event[];
}

interface CreateActionRequestProps extends CreateRequestProps {
  objectives: QuantifiableObjective[];
  events: Event[];
}

export class ActionRequest extends Request<ActionRequestProps> {
  get objectives(): QuantifiableObjective[] {
    return [...this.props.objectives];
  }

  get events(): Event[] {
    return [...this.props.events];
  }

  private constructor(props: ActionRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CreateActionRequestProps,
    id?: string,
  ): Either<
    InvalidUniqueEntityIDError | InvalidDescriptionError,
    ActionRequest
  > {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const actionRequest = new ActionRequest(
      {
        name: props.name,
        description: descriptionOrError.value,
        status: props.status ?? RequestStatus.PENDING,
        reason: props.reason,
        objectives: props.objectives ?? [],
        events: props.events ?? [],
      },
      idOrError.value,
    );

    return right(actionRequest);
  }

  public approve(reason?: string): Either<RequestAlreadyResolvedError, void> {
    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedError(this.id.value));
    }

    this.props.status = RequestStatus.APPROVED;
    if (reason) this.props.reason = reason;
    return right(undefined);
  }

  public reject(
    reason: string,
  ): Either<RequestAlreadyResolvedError | RequestError, void> {
    if (!reason) {
      return left(new RequestError('Rejection reason must be provided'));
    }

    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedError(this.id.value));
    }

    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reason;
    return right(undefined);
  }
}
