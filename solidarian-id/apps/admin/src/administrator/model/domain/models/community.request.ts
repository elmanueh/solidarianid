import { Request, RequestProps } from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { Description } from '@app/value-objects/model/description';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause.request';
import { RequestError } from '@app/value-objects/errors/validation/request-validation.error';

interface CommunityRequestProps extends RequestProps {
  causes: CauseRequest[];
}

interface CreateCommunityRequestProps {
  name: string;
  description: string;
  status?: RequestStatus;
  reason?: string;
  causes: CauseRequest[];
}

export class CommunityRequest extends Request<CommunityRequestProps> {
  get causes(): CauseRequest[] {
    return this.props.causes;
  }

  private constructor(props: CommunityRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateCommunityRequestProps, id?: string): Either<ValidationError, CommunityRequest> {
    const idOrError = UniqueEntityID.create(id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const descriptionOrError = Description.create(props.description);
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const request = new CommunityRequest(
      {
        name: props.name,
        description: descriptionOrError.value,
        status: props.status ?? RequestStatus.PENDING,
        reason: props.reason,
        causes: props.causes ?? [],
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

    this.props.causes.forEach(cause => cause.approve('Approved as part of community request'));

    return right(undefined);
  }

  public reject(reason: string): Either<RequestAlreadyResolvedError | RequestError, void> {
    if (this.props.status !== RequestStatus.PENDING) {
      return left(new RequestAlreadyResolvedError(this.id.value));
    }

    if (!reason) {
      return left(new RequestError('Rejection reason must be provided'));
    }

    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reason;

    const res = this.props.causes.map(cause => cause.reject(reason));
    const errors = res.filter(r => r.isLeft() && !(r.value instanceof RequestAlreadyResolvedError));

    if (errors.length > 0) {
      return left(errors[0].value as RequestError);
    }

    return right(undefined);
  }
}
