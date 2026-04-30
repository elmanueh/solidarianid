'use client';
import { HeaderBrandDesktop } from '@/components/app-header/header-brand-desktop';
import { HeaderBrandMobile } from '@/components/app-header/header-brand-mobile';
import { NotificationBellButton } from '@/components/app-header/notification-bell-button';
import { useAppSelector } from '@/features/redux/redux-hook';
import { useNotificationStatus } from '@/hooks/use-notification-status';

export function Header() {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const { unreadCount } = useNotificationStatus({ userId: currentUserId });

  return (
    <header className="sticky top-0 z-40 flex justify-between rounded-b-2xl border-b border-b-gray-300 bg-background px-5 pt-5 pb-4 md:m-5 md:border-0">
      <HeaderBrandDesktop />
      <HeaderBrandMobile />
      <NotificationBellButton unreadCount={unreadCount} />
    </header>
  );
}
