import { Dexie, type Table } from 'dexie';
import { Notification, NOTIFICATIONS_SCHEMA } from './entities/notification';

const SCHEMA_VERSION: number = 1;

export class SolidarianDexieDatabase extends Dexie {
  notifications!: Table<Notification, string>;

  constructor() {
    super('NotificationsDatabase');

    this.addStorageSchema(SCHEMA_VERSION, {
      notifications: NOTIFICATIONS_SCHEMA,
    });
  }

  addStorageSchema(version: number, stores: { [tableName: string]: string }): void {
    this.version(version).stores(stores);
  }
}

export const db = new SolidarianDexieDatabase();
