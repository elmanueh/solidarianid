'use client';

import { HeaderBrandDesktop } from '@/components/app-header/header-brand-desktop';
import { HeaderBrandMobile } from '@/components/app-header/header-brand-mobile';
import { NotificationBellButton } from '@/components/app-header/notification-bell-button';
import { SidebarLateral } from '@/components/sidebar';
import { SidebarMobile } from '@/components/sidebar-mobile';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAppSelector } from '@/features/redux/redux-hook';
import { useNotificationStatus } from '@/hooks/use-notification-status';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const { unreadCount } = useNotificationStatus({ userId: currentUserId });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarLateral />

        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex justify-between rounded-b-2xl border-b border-b-gray-300 bg-background px-5 pt-5 pb-4 md:m-5 md:border-0">
            <HeaderBrandDesktop />
            <HeaderBrandMobile />
            <NotificationBellButton unreadCount={unreadCount} />
          </header>
          <main className="flex-1 p-5 md:ps-10">{children}</main>
        </SidebarInset>

        <SidebarMobile />
      </div>
    </SidebarProvider>
  );
}
