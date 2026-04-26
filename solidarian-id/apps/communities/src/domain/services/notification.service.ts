import { RequestStatusChanged } from '@app/communities/domain/ports/subscriptions-publisher.port';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

export interface CauseNotificationEvent {
  eventType: 'CAUSE';
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  durationDays: number;
  ods: SustainableDevelopmentGoal[];
  communityId: string;
  userIds: string[];
}

export interface ActionNotificationEvent {
  eventType: 'ACTION';
  id: string;
  name: string;
  description: string;
  causeId: string;
}

export type NotificationEvent =
  | ActionNotificationEvent
  | CauseNotificationEvent
  | (RequestStatusChanged & { eventType: 'REQUEST_STATUS_CHANGED' });

export abstract class NotificationServicePort {
  abstract sendNotification(event: NotificationEvent): Promise<void>;
}
