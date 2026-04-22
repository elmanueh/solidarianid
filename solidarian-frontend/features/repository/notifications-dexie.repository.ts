import { db } from '@/features/repository/db';
import { DexieRepository } from '@/features/repository/dexie.repository';
import { NotificationsRepository } from '@/features/repository/notifications.repository';
import { Notification } from './entities/notification';

export class NotificationsDexieRepository extends DexieRepository<Notification> implements NotificationsRepository {
  constructor() {
    super(db.notifications);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return this.table.where('userId').equals(userId).toArray();
  }

  async findByUserIdSorted(userId: string, direction: 'asc' | 'desc' = 'desc'): Promise<Notification[]> {
    const notifications = await this.findByUserId(userId);

    return notifications.sort((left, right) => {
      const leftTimestamp = new Date(left.createdAt).getTime();
      const rightTimestamp = new Date(right.createdAt).getTime();

      return direction === 'asc' ? leftTimestamp - rightTimestamp : rightTimestamp - leftTimestamp;
    });
  }

  async countUnreadByUser(userId: string): Promise<number> {
    return this.table
      .where('userId')
      .equals(userId)
      .and(notification => !notification.read)
      .count();
  }

  async markAsRead(id: string): Promise<void> {
    await this.table.update(id, { read: true });
  }

  async markAllAsRead(userId?: string): Promise<void> {
    if (userId) {
      await this.table
        .where('userId')
        .equals(userId)
        .and(notification => !notification.read)
        .modify({ read: true });
      return;
    }

    await this.table.filter(notification => !notification.read).modify({ read: true });
  }
}

const notificationsRepository = new NotificationsDexieRepository();

export default notificationsRepository;
