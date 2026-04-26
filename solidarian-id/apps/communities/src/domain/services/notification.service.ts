import { Action } from '@app/communities/domain/model/entities/action';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { RequestStatusChanged } from '@app/communities/domain/ports/subscriptions-publisher.port';

export type NotificationEvent =
  | (Action & { eventType: 'ACTION' })
  | (Cause & { eventType: 'CAUSE' })
  | (RequestStatusChanged & { eventType: 'REQUEST_STATUS_CHANGED' });

export abstract class NotificationServicePort {
  abstract sendNotification(event: NotificationEvent): Promise<void>;
}
