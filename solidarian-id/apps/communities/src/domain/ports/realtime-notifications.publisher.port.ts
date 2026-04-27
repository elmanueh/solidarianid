import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { CauseCreatedEvent } from '@app/communities/domain/events/cause-created.event';
import { RequestStatusChangedEvent } from '@app/communities/domain/events/request-status-changed.event';

export abstract class RealtimeNotificationsPublisherPort {
  abstract publishCauseCreated(event: CauseCreatedEvent): Promise<void>;
  abstract publishActionCreated(event: ActionCreatedEvent): Promise<void>;
  abstract publishRequestStatusChanged(event: RequestStatusChangedEvent): Promise<void>;
}
