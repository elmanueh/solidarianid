'use client';

import notificationsRepository from '@/features/repository/notifications-dexie.repository';
import { useCallback, useEffect, useState } from 'react';

interface UseNotificationStatusResult {
  unreadCount: number;
  hasNotifications: boolean;
}

interface UseNotificationStatusProps {
  userId?: string;
}

export const NOTIFICATION_UPDATE_EVENT = 'notification-update';

export function useNotificationStatus({ userId }: UseNotificationStatusProps = {}): UseNotificationStatusResult {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = useCallback(async (): Promise<void> => {
    if (!userId) {
      setUnreadCount(0);
      return;
    }

    try {
      const unread = await notificationsRepository.countUnreadByUser(userId);
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
    }
  }, [userId]);

  useEffect(() => {
    const handleNotificationUpdate = () => {
      updateUnreadCount();
    };

    window.addEventListener(NOTIFICATION_UPDATE_EVENT, handleNotificationUpdate);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateUnreadCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interval = setInterval(updateUnreadCount, 5000);

    return () => {
      window.removeEventListener(NOTIFICATION_UPDATE_EVENT, handleNotificationUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [updateUnreadCount]);

  return {
    unreadCount,
    hasNotifications: unreadCount > 0,
  };
}
