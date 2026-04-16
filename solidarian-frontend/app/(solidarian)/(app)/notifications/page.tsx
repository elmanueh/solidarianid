'use client';

import { NotificationCard } from '@/components/notifications/notification-card';
import { NotificationHeader } from '@/components/notifications/notification-header';
import { useAppSelector } from '@/features/redux/redux-hook';
import { db } from '@/features/repository/db';
import { Notification } from '@/features/repository/entities/notification';
import { IconBell } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = currentUserId
        ? await db.notifications.where('userId').equals(currentUserId).toArray()
        : await db.notifications.toArray();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAllAsRead = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6 dark:bg-background">
        <p className="text-sm text-muted-foreground">Cargando notificaciones...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col pb-24 dark:bg-background">
      <NotificationHeader userId={currentUserId} onMarkAllAsRead={handleMarkAllAsRead} />

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-10 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-500">
            <IconBell size={40} />
          </div>
          <h3 className="text-lg font-bold text-brand-ink dark:text-foreground">Todo al dia</h3>
          <p className="max-w-60 text-sm text-neutral-500 dark:text-muted-foreground">
            No tienes notificaciones nuevas en este momento.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-6">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <NotificationCard {...notification} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
