import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { CommunitiesDomainEvent } from './domain-event';

export interface RequestStatusChangedEventProps {
  id: string;
  userId: string;
  type: RequestType;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  createdEntityId?: string;
}

export class RequestStatusChangedEvent implements CommunitiesDomainEvent {
  readonly eventName = 'REQUEST_STATUS_CHANGED';
  readonly occurredOn = new Date();
  readonly id: string;
  readonly userId: string;
  readonly type: RequestType;
  readonly name: string;
  readonly description: string;
  readonly status: RequestStatus;
  readonly reason?: string;
  readonly createdEntityId?: string;

  constructor(props: RequestStatusChangedEventProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.type = props.type;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status;
    this.reason = props.reason;
    this.createdEntityId = props.createdEntityId;
  }
}
