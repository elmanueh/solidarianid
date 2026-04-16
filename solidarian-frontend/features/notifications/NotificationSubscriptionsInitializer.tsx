'use client';

import { useAppSelector } from '@/features/redux/redux-hook';
import { useNotificationSubscriptions } from '@/hooks/use-notification-subscriptions';

export function NotificationSubscriptionsInitializer(): null {
  const user = useAppSelector(state => state.auth.currentUser);

  // aqui se comprobará las preferncias del usuario
  useNotificationSubscriptions({
    userId: user?.id || '',
    enabled: !!user?.id,
  });

  return null;
}
