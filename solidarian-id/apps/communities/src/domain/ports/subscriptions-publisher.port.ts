import { Action } from '@app/communities/domain/model/entities/action';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { Cause } from '../model/entities/cause';

export interface RequestStatusChanged {
  id: string;
  userId: string;
  type: RequestType;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  createdEntityId?: string;
}

export abstract class SubscriptionsPublisherPort {
  abstract publishCauseCreated(cause: Cause): Promise<void>;
  abstract publishActionCreated(action: Action): Promise<void>;
  abstract publishRequestStatusChanged(event: RequestStatusChanged): Promise<void>;
}
