import { AggregateRoot } from '@app/ddd/aggregate-root';
import { DomainEvent } from '@app/ddd/domain-event';
import { Either, left, right } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Name } from '@app/value-objects/model/name';
import { Reason } from '@app/value-objects/model/reason';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { RequestStatus } from '../enums/request-status';
import { RequestType } from '../enums/request-type';
import { User } from './user';

export interface RequestProps {
  type: RequestType;
  name: Name;
  description: Description;
  status: RequestStatus;
  reason?: Reason;
  user: User;
}

export interface RequestCreationProps {
  type: RequestType;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  user: User;
}

export class Request<T extends RequestProps> extends AggregateRoot<T> {
  protected constructor(props: T, id?: UniqueEntityID) {
    super(props, id);
  }

  get type(): RequestType {
    return this.props.type;
  }

  get name(): string {
    return this.props.name.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get status(): RequestStatus {
    return this.props.status;
  }

  get reason(): string | undefined {
    return this.props.reason?.value;
  }

  get user(): User {
    return this.props.user;
  }

  public pullDomainEvents(): DomainEvent[] {
    return super.pullDomainEvents();
  }

  static create(props: RequestCreationProps, id?: string): Either<ValidationError, Request<RequestProps>> {
    const uniqueID = UniqueEntityID.create(id);
    const nameOrError = Name.create(props.name);
    const descriptionOrError = Description.create(props.description);
    const reasonOrError = Reason.create(props.reason);

    if (nameOrError.isLeft()) return left(nameOrError.value);
    if (uniqueID.isLeft()) return left(uniqueID.value);
    if (descriptionOrError.isLeft()) return left(descriptionOrError.value);
    if (reasonOrError.isLeft()) return left(reasonOrError.value);

    return right(
      new Request<RequestProps>(
        {
          type: props.type,
          name: nameOrError.value,
          description: descriptionOrError.value,
          status: props.status,
          reason: reasonOrError.value,
          user: props.user,
        },
        uniqueID.value,
      ),
    );
  }

  reject(reason: string): Either<ValidationError, void> {
    const reasonOrError = Reason.create(reason);
    if (reasonOrError.isLeft()) {
      return left(reasonOrError.value);
    }
    this.props.status = RequestStatus.REJECTED;
    this.props.reason = reasonOrError.value;
    return right(undefined);
  }

  accept(reason: string): Either<ValidationError, void> {
    const reasonOrError = Reason.create(reason);
    if (reasonOrError.isLeft()) {
      return left(reasonOrError.value);
    }
    this.props.status = RequestStatus.APPROVED;
    this.props.reason = reasonOrError.value;
    return right(undefined);
  }
}
