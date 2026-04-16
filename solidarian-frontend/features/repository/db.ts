import { Dexie, type EntityTable } from 'dexie';
import { Notification, NotificationField } from './entities/notification';

const db = new Dexie('NotificationsDatabase') as Dexie & {
  notifications: EntityTable<Notification, NotificationField.userId>;
};

db.version(1).stores({
  notifications: `${NotificationField.id}, ${NotificationField.userId}, ${NotificationField.title}, 
    ${NotificationField.message}, ${NotificationField.read}, ${NotificationField.createdAt}, ${NotificationField.type}`,
});

export { db };
