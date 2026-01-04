import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Request, RequestCreationProps, RequestProps } from './request';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right, sequence } from '@app/ddd/either';
import { Name } from '@app/value-objects/model/name';
import { Description } from '@app/value-objects/model/description';
import { RequestStatus } from '../enums/request-status';
import { RequestType } from '../enums/request-type';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Duration } from '@app/value-objects/model/duration';
import { Reason } from '@app/value-objects/model/reason';

export interface CommunityCauseRequestProps {
  name: Name;
  description: Description;
  status: RequestStatus;
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: Duration;
}
export interface CommunityCauseRequestCreationProps {
  name: string;
  description: string;
  status: RequestStatus;
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: number;
}

export interface CommunityRequestProps extends RequestProps {
  causeRequests: CommunityCauseRequestProps[];
}

export interface CommunityRequestCreationProps extends RequestCreationProps {
  causeCreationRequests: CommunityCauseRequestCreationProps[];
}

export class CommunityRequest extends Request<CommunityRequestProps> {
  private constructor(props: CommunityRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get causeRequests(): ReadonlyArray<CommunityCauseRequestProps> {
    return this.props.causeRequests;
  }

  public static create(props: CommunityRequestCreationProps, id?: string): Either<ValidationError, CommunityRequest> {
    const { name, description, reason, status, user, causeCreationRequests } = props;

    const uniqueId = UniqueEntityID.create(id);
    const nameOrError = Name.create(name);
    const reasonOrError = Reason.create(reason);
    const descriptionOrError = Description.create(description);
    const causeRequestsOrError = sequence(
      causeCreationRequests.map(causeCreationRequest => CommunityRequest.validateCause(causeCreationRequest)),
    );

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    if (causeRequestsOrError.isLeft()) return left(causeRequestsOrError.value);

    const requestProps: CommunityRequestProps = {
      type: RequestType.COMMUNITY,
      name: nameOrError.value,
      description: descriptionOrError.value,
      reason: reasonOrError.value,
      status,
      user,
      causeRequests: causeRequestsOrError.value,
    };

    return right(new CommunityRequest(requestProps, uniqueId.value));
  }

  private static validateCause(
    cause: CommunityCauseRequestCreationProps,
  ): Either<ValidationError, CommunityCauseRequestProps> {
    const nameOrError = Name.create(cause.name);
    const descriptionOrError = Description.create(cause.description);
    const durationDaysOrError = Duration.create(cause.durationDays);

    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    if (durationDaysOrError.isLeft()) return left(durationDaysOrError.value);

    return right({
      name: nameOrError.value,
      description: descriptionOrError.value,
      status: cause.status,
      ods: cause.ods,
      initialDate: cause.initialDate,
      durationDays: durationDaysOrError.value,
    });
  }
}
