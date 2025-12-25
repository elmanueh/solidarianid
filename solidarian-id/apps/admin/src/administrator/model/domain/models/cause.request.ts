import { SustainableDevelopmentGoal } from '@app/admin/administrator/model/domain/enums/ods';
import {
  Request,
  RequestProps,
} from '@app/admin/administrator/model/domain/models/request';
import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { Duration } from '@app/value-objects/model/duration';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

interface RequestCauseProps extends RequestProps {
  duration: Duration;
  ods: SustainableDevelopmentGoal[];
}

export class RequestCause extends Request<RequestCauseProps> {
  get ods(): SustainableDevelopmentGoal[] {
    return this.props.ods;
  }

  get duration(): Duration {
    return this.props.duration;
  }

  private constructor(props: RequestCauseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: RequestCauseProps,
    id?: UniqueEntityID,
  ): RequestCause {
    return new RequestCause(props, id);
  }

  public approve(reason?: string): void {
    this.props.status = RequestStatus.APPROVED;
    if (reason) this.props.reason = reason;
  }

  public reject(reason: string): void {
    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reason;
  }
}
