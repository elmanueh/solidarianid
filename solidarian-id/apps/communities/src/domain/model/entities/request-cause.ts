import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { Duration } from '@app/value-objects/model/duration';
import { RequestProps, Request, RequestCreationProps } from './request';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Name } from '@app/value-objects/model/name';
import { Description } from '@app/value-objects/model/description';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Reason } from '@app/value-objects/model/reason';

export interface CauseRequestProps extends RequestProps {
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: Duration;
}

export interface CauseRequestCreationProps extends RequestCreationProps {
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: number;
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

  public static create(props: CauseRequestCreationProps, id?: string): Either<ValidationError, CauseRequest> {
    const { name, description, status, user, reason, ods, initialDate, durationDays } = props;
    const uniqueId = UniqueEntityID.create(id);
    const nameOrError = Name.create(name);
    const descriptionOrError = Description.create(description);
    const reasonOrError = Reason.create(reason);
    const durationDaysOrError = Duration.create(durationDays);

    if (uniqueId.isLeft()) return left(uniqueId.value);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);
    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    if (durationDaysOrError.isLeft()) return left(durationDaysOrError.value);

    const causeRequestProps: CauseRequestProps = {
      name: nameOrError.value,
      description: descriptionOrError.value,
      status,
      user,
      reason: reasonOrError.value,
      ods,
      initialDate,
      durationDays: durationDaysOrError.value,
    };

    const causeRequest = new CauseRequest(causeRequestProps, uniqueId.value);
    return right(causeRequest);
  }
}
