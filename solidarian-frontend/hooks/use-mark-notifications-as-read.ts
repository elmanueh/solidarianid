'use client';

import { db } from '@/features/repository/db';
import { useCallback } from 'react';
import { NOTIFICATION_UPDATE_EVENT } from './use-notification-status';

interface UseMarkNotificationsAsReadResult {
  markAllAsRead: (userId?: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export function useMarkNotificationsAsRead(): UseMarkNotificationsAsReadResult {
  const markAllAsRead = useCallback(async (userId?: string): Promise<void> => {
    try {
      const notifications = userId
        ? await db.notifications.where('userId').equals(userId).toArray()
        : await db.notifications.toArray();
      const unreadNotifications = notifications.filter(n => !n.read);

      await Promise.all(
        unreadNotifications.map(notification => db.notifications.update(notification.id, { read: true }))
      );

      window.dispatchEvent(new Event(NOTIFICATION_UPDATE_EVENT));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }, []);

  const markAsRead = useCallback(async (id: string): Promise<void> => {
    try {
      const notification = await db.notifications.get(id);
      if (notification && !notification.read) {
        await db.notifications.update(id, { read: true });
        window.dispatchEvent(new Event(NOTIFICATION_UPDATE_EVENT));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }, []);

  return {
    markAllAsRead,
    markAsRead,
  };
}
