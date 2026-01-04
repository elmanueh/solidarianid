import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

/**
 * DTO for cause request domain events.
 * Contains all the fields from the CauseRequest domain model.
 */
export class CauseRequestEventDto {
  id: string;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  userId: string;
  username: string;
  communityId: string;
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: number;
  type: RequestType = RequestType.CAUSE;
}
