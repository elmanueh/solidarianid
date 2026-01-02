import { RequestStatus } from '@app/communities/domain/model/enums/request-status';

/**
 * DTO for an objective within an action request event
 */
export class ActionRequestObjectiveEventDto {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

/**
 * DTO for the place of an event within an action request
 */
export class ActionRequestEventPlaceDto {
  direction: string;
  city: string;
  countryCode: string;
}

/**
 * DTO for an event within an action request event
 */
export class ActionRequestEventEventDto {
  name: string;
  description: string;
  initialDate: Date;
  place: ActionRequestEventPlaceDto;
}

/**
 * DTO for action request domain events.
 * Contains all the fields from the ActionRequest domain model.
 */
export class ActionRequestEventDto {
  id: string;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string;
  userId: string;
  username: string;
  objectives: ActionRequestObjectiveEventDto[];
  events: ActionRequestEventEventDto[];
}
