import { SustainableDevelopmentGoal } from '@app/admin/administrator/model/domain/enums/ods';
import {
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { Duration } from '@app/value-objects/model/duration';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action.request';
import { RequestError } from '@app/value-objects/errors/validation/request-validation.error';

interface CauseRequestProps extends RequestProps {
  duration: Duration;
  ods: SustainableDevelopmentGoal[];
  actions: ActionRequest[];
}

interface CreateCauseRequestProps {
  name: string;
  description: string;
  status?: RequestStatus;
  reason?: string;

  startDate: Date;
  endDate: Date;
  ods: SustainableDevelopmentGoal[];
}

export class CauseRequest extends Request<CauseRequestProps> {
  get ods(): SustainableDevelopmentGoal[] {
    return this.props.ods;
  }

  get duration(): Duration {
    return this.props.duration;
  }

  private constructor(props: CauseRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CreateCauseRequestProps,
    id?: string,
  ): Either<ValidationError, CauseRequest> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const durationOrError = Duration.create(props.startDate, props.endDate);
    if (durationOrError.isLeft()) {
      return left(durationOrError.value);
    }

    const request = new CauseRequest(
      {
        name: props.name,
        description: descriptionOrError.value,
        status: props.status ?? RequestStatus.PENDING,
        reason: props.reason,
        duration: durationOrError.value,
        ods: props.ods,
        actions: [],
      },
      idOrError.value,
    );

    return right(request);
  }

  public approve(reason?: string): Either<RequestAlreadyResolvedError, void> {
    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedError(this.id.value));
    }

    this.props.status = RequestStatus.APPROVED;
    if (reason) this.props.reason = reason;

    this.props.actions.forEach((action) =>
      action.approve('Approved as part of cause request'),
    );

    return right(undefined);
  }

  public reject(
    reason: string,
  ): Either<RequestAlreadyResolvedError | RequestError, void> {
    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedError(this.id.value));
    }

    if (!reason) {
      return left(new RequestError('Rejection reason must be provided'));
    }

    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reason;

    const res = this.props.actions.map((action) => action.reject(reason));
    const errors = res.filter(
      (r) => r.isLeft() && !(r.value instanceof RequestAlreadyResolvedError),
    );

    if (errors.length > 0) {
      return left(errors[0].value as RequestError);
    }

    return right(undefined);
  }
}
