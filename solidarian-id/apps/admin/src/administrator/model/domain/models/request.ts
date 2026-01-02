import { RequestStatus } from '@app/admin/administrator/model/domain/enums/request-status';
import { RequestAlreadyResolvedError } from '@app/admin/administrator/model/domain/errors/already-resolved.request.error';
import { Either } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { RequestError } from '@app/value-objects/errors/validation/request-validation.error';
import { Description } from '@app/value-objects/model/description';
import { Reason } from '@app/value-objects/model/reason';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

export interface RequestProps {
  name: string;
  description: Description;
  status: RequestStatus;
  reason?: Reason;
}

export interface CreateRequestProps {
  name: string;
  description: string;
  status?: RequestStatus;
  reason?: string;
}

export abstract class Request<T> extends Entity<T & RequestProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): Description {
    return this.props.description;
  }

  get status(): RequestStatus {
    return this.props.status;
  }

  get reason(): string | undefined {
    return this.props.reason?.value;
  }

  protected constructor(props: T & RequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /** Marks the request as approved and optionally stores an admin note. */
  public abstract approve(reason?: string): Either<RequestAlreadyResolvedError, void>;

  /** Marks the request as rejected and stores the rejection reason. */
  public abstract reject(reason: string): Either<RequestAlreadyResolvedError | RequestError, void>;
}
