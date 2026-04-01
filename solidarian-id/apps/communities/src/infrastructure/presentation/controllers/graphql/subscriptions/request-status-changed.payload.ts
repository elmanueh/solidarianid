import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { RequestType } from '@app/communities/domain/model/enums/request-type';

export interface RequestStatusChangedPayload {
  id: string;
  userId: string;
  type: RequestType;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  createdEntityId?: string;
}
