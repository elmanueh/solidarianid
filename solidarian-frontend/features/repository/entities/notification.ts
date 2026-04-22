import { Indentificable } from '@/features/repository/repository';

export interface Notification extends Indentificable {
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  type: NotificationType;
  link: string;
}

export enum NotificationField {
  id = 'id',
  userId = 'userId',
  title = 'title',
  message = 'message',
  read = 'read',
  createdAt = 'createdAt',
  type = 'type',
  link = 'link',
}

export enum NotificationType {
  REQUEST_ACCEPTED,
  REQUEST_REJECTED,
  CAUSE_CREATED,
  ACTION_CREATED,
}

export const NOTIFICATIONS_SCHEMA = `${NotificationField.id}, ${NotificationField.userId}, ${NotificationField.title},
  ${NotificationField.message}, ${NotificationField.read}, ${NotificationField.createdAt}, ${NotificationField.type}, ${NotificationField.link}`;
