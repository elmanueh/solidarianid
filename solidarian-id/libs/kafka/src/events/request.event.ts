import { EventType } from '../events.enum';
import { GenericEvent } from './generic.event';
import { ActionRequestEventDto } from '../dtos/requests/request-action.event.dto';
import { CauseRequestEventDto } from '../dtos/requests/request-cause.event.dto';
import { CommunityRequestEventDto } from '../dtos/requests/request-community.event.dto';

export type RequestEventDto = CommunityRequestEventDto | CauseRequestEventDto | ActionRequestEventDto;

/**
 * Domain event for request-related operations.
 * Supports Community, Cause, and Action request types.
 */
export class RequestEvent extends GenericEvent<RequestEventDto> {
  constructor(eventType: EventType, data: RequestEventDto) {
    super(eventType, data);
  }
}
