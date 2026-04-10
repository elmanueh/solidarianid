'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui';
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
        <ThemeProvider>
          <Toaster richColors closeButton /> {children}
        </ThemeProvider>
      </AuthInitializer>
    </Provider>
  );
}
