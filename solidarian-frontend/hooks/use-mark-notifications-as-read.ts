'use client';

import notificationsRepository from '@/features/repository/notifications-dexie.repository';
import { useCallback } from 'react';
import { NOTIFICATION_UPDATE_EVENT } from './use-notification-status';

interface UseMarkNotificationsAsReadResult {
  markAllAsRead: (userId?: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export function useMarkNotificationsAsRead(): UseMarkNotificationsAsReadResult {
  const markAllAsRead = useCallback(async (userId?: string): Promise<void> => {
    try {
      await notificationsRepository.markAllAsRead(userId);
      window.dispatchEvent(new Event(NOTIFICATION_UPDATE_EVENT));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }, []);

  const markAsRead = useCallback(async (id: string): Promise<void> => {
    try {
      const notification = await notificationsRepository.findById(id);

      if (notification && !notification.read) {
        await notificationsRepository.markAsRead(id);
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
