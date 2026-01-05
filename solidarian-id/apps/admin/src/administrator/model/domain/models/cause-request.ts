import {
  CreateRequestProps,
  ReconstituteRequestProps,
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestInvalidStatusError } from '@app/admin/administrator/model/domain/errors/invalid-status.request-error';
import { ActionRequest, CreateActionRequestProps } from '@app/admin/administrator/model/domain/models/action-request';
import { Duration } from '@app/value-objects/model/duration';
import { Reason } from '@app/value-objects/model/reason';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

interface CauseRequestProps extends RequestProps {
  startDate: Date;
  duration: Duration;
  ods: SustainableDevelopmentGoal[];
  actions: ActionRequest[];
  communityId: UniqueEntityID;
}

export interface CreateCauseRequestProps extends CreateRequestProps {
  startDate: Date;
  duration: number;
  ods: SustainableDevelopmentGoal[];
  communityId: string;
}

export interface ReconstituteCauseRequestProps extends ReconstituteRequestProps {
  startDate: Date;
  duration: number;
  ods: number[];
  actions: ActionRequest[];
  communityId: string;
}

export class CauseRequest extends Request<CauseRequestProps> {
  get startDate(): Date {
    return this.props.startDate;
  }

  get duration(): number {
    return this.props.duration.value;
  }

  get ods(): ReadonlyArray<SustainableDevelopmentGoal> {
    return this.props.ods;
  }

  get actions(): ReadonlyArray<ActionRequest> {
    return this.props.actions;
  }

  get communityId(): string {
    return this.props.communityId.value;
  }

  private constructor(props: CauseRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateCauseRequestProps, id?: string): Either<ValidationError, CauseRequest> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const durationOrError = Duration.create(props.duration);
    if (durationOrError.isLeft()) return left(durationOrError.value);

    const userIdOrError = UniqueEntityID.create(props.userId);
    if (userIdOrError.isLeft()) return left(userIdOrError.value);

    const communityIdOrError = UniqueEntityID.create(props.communityId);
    if (communityIdOrError.isLeft()) return left(communityIdOrError.value);

    const request = new CauseRequest(
      {
        name: props.name,
        description: descriptionOrError.value,
        status: RequestStatus.PENDING,
        userId: userIdOrError.value.value,
        startDate: props.startDate,
        duration: durationOrError.value,
        ods: props.ods,
        actions: [],
        communityId: communityIdOrError.value,
      },
      idOrError.value,
    );

    return right(request);
  }

  public static reconstitute(props: ReconstituteCauseRequestProps): Either<ValidationError, CauseRequest> {
    const idOrError = UniqueEntityID.create(props.id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const durationOrError = Duration.create(props.duration);
    if (durationOrError.isLeft()) return left(durationOrError.value);

    const reasonOrError = Reason.create(props.reason);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);

    const userIdOrError = UniqueEntityID.create(props.userId);
    if (userIdOrError.isLeft()) return left(userIdOrError.value);

    const communityIdOrError = UniqueEntityID.create(props.communityId);
    if (communityIdOrError.isLeft()) return left(communityIdOrError.value);

    return right(
      new CauseRequest(
        {
          name: props.name,
          description: descriptionOrError.value,
          status: props.status as RequestStatus,
          reason: reasonOrError.value,
          userId: userIdOrError.value.value,
          startDate: props.startDate,
          duration: durationOrError.value,
          ods: props.ods,
          actions: props.actions,
          communityId: communityIdOrError.value,
        },
        idOrError.value,
      ),
    );
  }

  public addAction(action: Omit<CreateActionRequestProps, 'causeId'>): Either<ValidationError, void> {
    const actionOrError = ActionRequest.create({
      ...action,
      causeId: this.id.value,
    });
    if (actionOrError.isLeft()) return left(actionOrError.value);

    this.props.actions.push(actionOrError.value);
    return right(undefined);
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

  public reject(reason: string): Either<RequestInvalidStatusError | ValidationError, void> {
    if (!reason) return left(new ValidationError('Rejection reason must be provided'));

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
