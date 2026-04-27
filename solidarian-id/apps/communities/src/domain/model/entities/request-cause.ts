import { RequestCreatedEvent } from '@app/communities/domain/events/request-created.event';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Duration } from '@app/value-objects/model/duration';
import { Name } from '@app/value-objects/model/name';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Reason } from '@app/value-objects/model/reason';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { RequestType } from '../enums/request-type';
import { Request, RequestCreationProps, RequestProps } from './request';

export interface CauseRequestProps extends RequestProps {
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: Duration;
  communityId: UniqueEntityID;
}

export interface CauseRequestCreationProps extends RequestCreationProps {
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: number;
  communityId: string;
}

export class CauseRequest extends Request<CauseRequestProps> {
  private constructor(props: CauseRequestProps, id?: UniqueEntityID) {
    super(props, id);
  }
  get ods(): SustainableDevelopmentGoal[] {
    return this.props.ods;
  }

  get initialDate(): Date {
    return this.props.initialDate;
  }

  get endDate(): Date {
    const endDate = new Date(this.initialDate);
    endDate.setDate(endDate.getDate() + this.props.durationDays.value);
    return endDate;
  }

  get durationDays(): Duration {
    return this.props.durationDays;
  }

  get communityId(): string {
    return this.props.communityId.value;
  }

  public static create(props: CauseRequestCreationProps, id?: string): Either<ValidationError, CauseRequest> {
    const { name, description, status, user, reason, ods, initialDate, durationDays } = props;
    const uniqueId = UniqueEntityID.create(id);
    const nameOrError = Name.create(name);
    const descriptionOrError = Description.create(description);
    const reasonOrError = Reason.create(reason);
    const durationDaysOrError = Duration.create(durationDays);
    const communityIdOrError = UniqueEntityID.create(props.communityId);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);
    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    if (durationDaysOrError.isLeft()) return left(durationDaysOrError.value);
    if (communityIdOrError.isLeft()) return left(communityIdOrError.value);

    const causeRequestProps: CauseRequestProps = {
      type: RequestType.CAUSE,
      name: nameOrError.value,
      description: descriptionOrError.value,
      status,
      user,
      reason: reasonOrError.value,
      ods,
      initialDate,
      durationDays: durationDaysOrError.value,
      communityId: communityIdOrError.value,
    };

    const request = new CauseRequest(causeRequestProps, uniqueId.value);
    request.addDomainEvent(new RequestCreatedEvent(request));

    return right(request);
  }
}
