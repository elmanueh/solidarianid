export type PushNotificationType = 'ACTION' | 'CAUSE' | 'REQUEST_STATUS_CHANGED' | string;

export type PushNotificationPayload = {
  title: string;
  message: string;
  type: PushNotificationType;
  createdAt?: string;
  data?: PushNotificationData;
};

export type PushNotificationData = {
  communityId?: string;
  actionId?: string;
  causeId?: string;
  requestId?: string;
  [key: string]: unknown;
};

export type StoredNotificationData = PushNotificationData & {
  type: PushNotificationType;
};
