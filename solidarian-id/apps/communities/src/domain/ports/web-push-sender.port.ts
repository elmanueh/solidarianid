import { RequestStatusChangedEventProps } from '@app/communities/domain/events/request-status-changed.event';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

export interface CauseWebPushNotification {
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

export interface ActionWebPushNotification {
  eventType: 'ACTION';
  id: string;
  name: string;
  description: string;
  causeId: string;
}

export type WebPushNotification =
  | ActionWebPushNotification
  | CauseWebPushNotification
  | (RequestStatusChangedEventProps & { eventType: 'REQUEST_STATUS_CHANGED' });

export abstract class WebPushSenderPort {
  abstract send(notification: WebPushNotification): Promise<void>;
}
