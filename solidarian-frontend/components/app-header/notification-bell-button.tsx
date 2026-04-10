import { ROUTES } from '@/features/routes';
import { IconBell, IconBellRinging } from '@tabler/icons-react';
import Link from 'next/link';

type NotificationBellButtonProps = {
  hasNotifications?: boolean;
  unreadCount?: number;
};

export function NotificationBellButton({ hasNotifications = false, unreadCount }: NotificationBellButtonProps) {
  const resolvedHasNotifications = unreadCount !== undefined ? unreadCount > 0 : hasNotifications;
  const BellIcon = resolvedHasNotifications ? IconBellRinging : IconBell;

  return (
    <div className="flex items-center gap-3">
      <Link
        href={ROUTES.app.notifications}
        className="group relative rounded-2xl border border-neutral-100 bg-white p-2.5 text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-chart-3 active:scale-90 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-chart-3"
        aria-label={resolvedHasNotifications ? 'Notificaciones nuevas' : 'Notificaciones'}
      >
        <BellIcon size={20} stroke={2} className={resolvedHasNotifications ? 'animate-pulse' : ''} />
        {resolvedHasNotifications ? (
          <span className="absolute top-2.5 right-2.5 h-2 w-2 animate-pulse rounded-full border-2 border-white bg-chart-3 ring-2 ring-chart-3/20 transition-transform group-hover:scale-110" />
        ) : null}
      </Link>
    </div>
  );
}
