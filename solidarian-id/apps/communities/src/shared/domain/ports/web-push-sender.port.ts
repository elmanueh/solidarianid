import { RequestStatusChangedEventProps } from '@app/communities/shared/domain/events/request-status-changed.event';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

export interface CauseWebPushNotification {
  eventType: SubscriptionType.CAUSE;
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
  eventType: SubscriptionType.ACTION;
  id: string;
  name: string;
  description: string;
  causeId: string;
}

export type WebPushNotification =
  | ActionWebPushNotification
  | CauseWebPushNotification
  | (RequestStatusChangedEventProps & { eventType: SubscriptionType.REQUEST_STATUS_CHANGED });

export enum SubscriptionType {
  REQUEST_STATUS_CHANGED = 'REQUEST_STATUS_CHANGED',
  CAUSE = 'CAUSE',
  ACTION = 'ACTION',
}

export abstract class WebPushSenderPort {
  abstract send(notification: WebPushNotification): Promise<void>;
}
