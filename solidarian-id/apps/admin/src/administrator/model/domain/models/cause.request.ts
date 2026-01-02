import { SustainableDevelopmentGoal } from '@app/admin/administrator/model/domain/enums/ods';
import { Request, RequestProps } from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { DurationRange } from '@app/value-objects/model/duration-range';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';

interface RequestCauseProps extends RequestProps {
  duration: DurationRange;
  ods: SustainableDevelopmentGoal[];
}

interface CreateRequestCauseProps {
  name: string;
  description: string;
  status?: RequestStatus;
  reason?: string;
  startDate: Date;
  endDate: Date;
  ods: SustainableDevelopmentGoal[];
}

export class RequestCause extends Request<RequestCauseProps> {
  get ods(): SustainableDevelopmentGoal[] {
    return this.props.ods;
  }

  get duration(): DurationRange {
    return this.props.duration;
  }

  private constructor(props: RequestCauseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateRequestCauseProps, id?: string): Either<ValidationError, RequestCause> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const durationOrError = DurationRange.create(
      props.startDate,
      props.endDate,
    );
    if (durationOrError.isLeft()) {
      return left(durationOrError.value);
    }

    const request = new RequestCause(
      {
        name: props.name,
        description: descriptionOrError.value,
        status: props.status ?? RequestStatus.PENDING,
        reason: props.reason,
        duration: durationOrError.value,
        ods: props.ods,
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
    return right(undefined);
  }

  public reject(reason: string): Either<RequestAlreadyResolvedError | ValidationError, void> {
    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedError(this.id.value));
    }

    if (!reason) return left(new ValidationError('Rejection reason must be provided'));

    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reason;
    return right(undefined);
  }
}
