import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

/**
 * DTO for a cause within a community request event
 */
export class CommunityRequestCauseEventDto {
  name: string;
  description: string;
  status: RequestStatus;
  ods: SustainableDevelopmentGoal[];
  initialDate: Date;
  durationDays: number;
}

/**
 * DTO for community request domain events.
 * Contains all the fields from the CommunityRequest domain model.
 */
export class CommunityRequestEventDto {
  id: string;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  userId: string;
  username: string;
  causeRequests: CommunityRequestCauseEventDto[];
}
