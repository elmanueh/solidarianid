import { EventType } from '@solidarianid/kafka';
import { UserEventDto } from '../dtos/user.event.dto';
import { GenericEvent } from './generic.event';

export class UserEvent extends GenericEvent<UserEventDto> {
  constructor(eventType: EventType, data: UserEventDto) {
    super(eventType, data);
  }
}
