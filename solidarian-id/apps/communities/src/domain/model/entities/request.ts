import { Description } from '@app/value-objects/model/description';
import { RequestStatus } from '../enums/request-status';
import { Entity } from '@app/ddd/entity';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { User } from './user';
import { Name } from '@app/value-objects/model/name';
import { Reason } from '@app/value-objects/model/reason';

export interface RequestProps {
  name: Name;
  description: Description;
  status: RequestStatus;
  reason?: Reason;
  user: User;
}

export interface RequestCreationProps {
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  user: User;
}

export abstract class Request<T> extends Entity<T & RequestProps> {
  protected constructor(props: T & RequestProps, id?: UniqueEntityID) {
    super(props, id);
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
}
