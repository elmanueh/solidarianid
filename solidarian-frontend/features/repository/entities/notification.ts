export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  type: NotificationType;
}

export enum NotificationField {
  id = 'id',
  userId = 'userId',
  title = 'title',
  message = 'message',
  read = 'read',
  createdAt = 'createdAt',
  type = 'type',
}

export enum NotificationType {
  REQUEST_ACCEPTED,
  REQUEST_REJECTED,
  CAUSE_CREATED,
  ACTION_CREATED,
}
