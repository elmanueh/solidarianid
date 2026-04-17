'use client';

import { NotificationCard } from '@/components/notifications/notification-card';
import { NotificationHeader } from '@/components/notifications/notification-header';
import { NotificationPagination } from '@/components/notifications/notification-pagination';
import { useAppSelector } from '@/features/redux/redux-hook';
import { PaginatedResult } from '@/features/repository/dexie.repository';
import { Notification } from '@/features/repository/entities/notification';
import notificationsRepository from '@/features/repository/notifications-dexie.repository';
import { NOTIFICATION_UPDATE_EVENT } from '@/hooks/use-notification-status';
import { IconBell } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 5;

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState<PaginatedResult<Notification>>({
    items: [],
    total: 0,
    offset: 0,
    limit: PAGE_SIZE,
  });
  const [loading, setLoading] = useState(true);
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const isFirstPage = page <= 1;
  const isLastPage = page * PAGE_SIZE >= notifications.total;

  const fetchNotifications = useCallback(
    async (pageToLoad = page) => {
      if (!currentUserId) {
        setNotifications({
          items: [],
          total: 0,
          offset: 0,
          limit: PAGE_SIZE,
        });
        setLoading(false);
        return;
      }

      try {
        const data = await notificationsRepository.paginate({
          filter: { userId: currentUserId },
          sortBy: 'createdAt',
          sortDirection: 'desc',
          offset: (pageToLoad - 1) * PAGE_SIZE,
          limit: PAGE_SIZE,
        });
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    },
    [currentUserId, page]
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleNotificationUpdate = () => {
      fetchNotifications();
    };

    window.addEventListener(NOTIFICATION_UPDATE_EVENT, handleNotificationUpdate);

    return () => {
      window.removeEventListener(NOTIFICATION_UPDATE_EVENT, handleNotificationUpdate);
    };
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
      {currentUserId ? <NotificationHeader userId={currentUserId} onMarkAllAsRead={handleMarkAllAsRead} /> : null}

      {notifications.total === 0 ? (
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
          {notifications.items.map((notification, index) => (
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

      {notifications.total > 0 ? (
        <NotificationPagination
          page={page}
          setPage={setPage}
          totalItems={notifications.total}
          pageSize={PAGE_SIZE}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      ) : null}
    </div>
  );
}
