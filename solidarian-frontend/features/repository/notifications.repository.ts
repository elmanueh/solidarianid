import { Notification } from './entities/notification';

export interface NotificationsRepository {
  findByUserId(userId: string): Promise<Notification[]>;

  findByUserIdSorted(userId: string, direction: 'asc' | 'desc'): Promise<Notification[]>;

  countUnreadByUser(userId: string): Promise<number>;

  markAsRead(id: string): Promise<void>;

  markAllAsRead(userId?: string): Promise<void>;
}
