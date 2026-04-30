import { RequestStatus } from '@app/communities/shared/domain/model/enums/request-status';
import { RequestType } from '@app/communities/shared/domain/model/enums/request-type';
import { DomainEvent } from '@app/ddd/domain-event';

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

export class RequestStatusChangedEvent implements DomainEvent {
  public readonly occurredOn = new Date();
  public readonly type = RequestStatusChangedEvent.name;
  public readonly id: string;
  public readonly userId: string;
  public readonly requestType: RequestType;
  public readonly name: string;
  public readonly description: string;
  public readonly status: RequestStatus;
  public readonly reason?: string;
  public readonly createdEntityId?: string;

  constructor(props: RequestStatusChangedEventProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.requestType = props.type;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status;
    this.reason = props.reason;
    this.createdEntityId = props.createdEntityId;
  }
}
