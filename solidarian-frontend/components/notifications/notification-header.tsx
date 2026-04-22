'use client';

import { ROUTES } from '@/features/routes';
import { useMarkNotificationsAsRead } from '@/hooks/use-mark-notifications-as-read';
import { useCallback } from 'react';
import BackButton from '../back-button';

interface NotificationHeaderProps {
  userId: string;
  onMarkAllAsRead: () => void;
}

export function NotificationHeader({ userId, onMarkAllAsRead }: NotificationHeaderProps) {
  const { markAllAsRead } = useMarkNotificationsAsRead();

  const handleMarkAsRead = useCallback(async () => {
    await markAllAsRead(userId);
    onMarkAllAsRead();
  }, [markAllAsRead, onMarkAllAsRead, userId]);

  return (
    <header className="flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-5 shadow-sm dark:border-border dark:bg-card">
      <nav className="flex items-center gap-4">
        <BackButton url={ROUTES.app.home} />
        <h1 className="text-xl font-bold text-brand-ink dark:text-foreground">Notificaciones</h1>
      </nav>

      <button
        type="button"
        onClick={handleMarkAsRead}
        className="hover:text-brand-white cursor-pointer font-bold tracking-widest text-brand-500 uppercase transition-colors"
      >
        <span className="hidden md:inline md:text-xs">Marcar como leídas</span>
        <span className="inline text-xs md:hidden">Marcar leídas</span>
      </button>
    </header>
  );
}
