'use client';

import { ApolloGraphqlProvider } from '@/components/apollo-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui';
import { NotificationSubscriptionsInitializer } from '@/features/notifications/NotificationSubscriptionsInitializer';
import { AuthInitializer } from '@/features/redux/AuthInitializer';
import store from '@/features/redux/store';
import { Provider } from 'react-redux';

export default function SolidarianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <ApolloGraphqlProvider>
          <NotificationSubscriptionsInitializer />
          <ThemeProvider>
            <Toaster richColors closeButton /> {children}
          </ThemeProvider>
        </ApolloGraphqlProvider>
      </AuthInitializer>
    </Provider>
  );
}
