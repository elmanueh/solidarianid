import {
  CreateRequestProps,
  ReconstituteRequestProps,
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right, sequence } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestInvalidStatusError } from '@app/admin/administrator/model/domain/errors/invalid-status.request-error';
import { CauseRequest, CreateCauseRequestProps } from '@app/admin/administrator/model/domain/models/cause-request';
import { Reason } from '@app/value-objects/model/reason';
import { RequestError } from '@app/admin/administrator/model/domain/errors/request-error';

interface CommunityRequestProps extends RequestProps {
  causes: CauseRequest[];
}

interface CreateCommunityRequestProps extends CreateRequestProps {
  causes: Omit<CreateCauseRequestProps, 'communityId'>[];
}

interface ReconstituteCommunityRequestProps extends ReconstituteRequestProps {
  causes: CauseRequest[];
}

export class CommunityRequest extends Request<CommunityRequestProps> {
  get causes(): ReadonlyArray<CauseRequest> {
    return this.props.causes;
  }

  private constructor(props: CommunityRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateCommunityRequestProps, id?: string): Either<ValidationError, CommunityRequest> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const userIdOrError = UniqueEntityID.create(props.userId);
    if (userIdOrError.isLeft()) return left(userIdOrError.value);

    if (props.causes.length < 1)
      return left(new RequestError('A community request must have at least one cause request.'));

    const causesOrError = sequence(
      props.causes.map(cause =>
        CauseRequest.create({
          ...cause,
          communityId: idOrError.value.value,
        }),
      ),
    );
    if (causesOrError.isLeft()) return left(causesOrError.value);

    return right(
      new CommunityRequest(
        {
          name: props.name,
          description: descriptionOrError.value,
          status: RequestStatus.PENDING,
          userId: userIdOrError.value.value,
          causes: causesOrError.value,
        },
        idOrError.value,
      ),
    );
  }

  public static reconstitute(props: ReconstituteCommunityRequestProps): Either<ValidationError, CommunityRequest> {
    const idOrError = UniqueEntityID.create(props.id);
    if (idOrError.isLeft()) return left(idOrError.value);

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);

    const reasonOrError = Reason.create(props.reason);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);

    const userIdOrError = UniqueEntityID.create(props.userId);
    if (userIdOrError.isLeft()) return left(userIdOrError.value);

    return right(
      new CommunityRequest(
        {
          name: props.name,
          description: descriptionOrError.value,
          status: props.status as RequestStatus,
          reason: reasonOrError.value,
          userId: userIdOrError.value.value,
          causes: props.causes,
        },
        idOrError.value,
      ),
    );
  }

  public addCause(cause: Omit<CreateCauseRequestProps, 'communityId'>): Either<ValidationError, void> {
    const causeOrError = CauseRequest.create({
      ...cause,
      communityId: this.id.value,
    });
    if (causeOrError.isLeft()) return left(causeOrError.value);

    this.props.causes.push(causeOrError.value);
    return right(undefined);
  }

  public approve(reason?: string): Either<RequestInvalidStatusError, void> {
    const reasonOrError = Reason.create(reason);
    if (reasonOrError.isLeft()) return left(new RequestError(reasonOrError.value.message));

    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestInvalidStatusError('Action request has already been resolved.', this.id.value));
    }

    this.props.status = RequestStatus.APPROVED;
    this.props.reason = reasonOrError.value;

    const res = sequence(this.props.causes.map(cause => cause.approve('Approved as part of community request.')));
    if (res.isLeft()) return left(new RequestInvalidStatusError(res.value.message, this.id.value));

    return right(undefined);
  }

  public reject(reason: string): Either<RequestInvalidStatusError, void> {
    const reasonOrError = Reason.create(reason);
    if (reasonOrError.isLeft()) return left(new RequestError(reasonOrError.value.message));

    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestInvalidStatusError('Action request has already been resolved.', this.id.value));
    }

    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reasonOrError.value;

    const res = sequence(this.props.causes.map(cause => cause.reject(reason)));
    if (res.isLeft()) return left(new RequestInvalidStatusError(res.value.message, this.id.value));

    return right(undefined);
  }
}
