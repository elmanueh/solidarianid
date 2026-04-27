'use client';

import AppLayout from '@/app/(solidarian)/(app)/layout';
import { ApolloGraphqlProvider } from '@/components/apollo-provider';
import { HardNavigationBridge } from '@/components/hard-navigation-bridge';
import RouteNotFound from '@/components/route-not-found';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui';
import { AuthInitializer } from '@/features/redux/AuthInitializer';
import store from '@/features/redux/store';
import { cn } from '@/lib/utils';
import { Geist_Mono, Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('antialiased', fontMono.variable, 'font-sans', inter.variable)}
    >
      <body className="bg-background text-foreground">
        <Provider store={store}>
          <AuthInitializer>
            <ApolloGraphqlProvider>
              <ThemeProvider>
                <Toaster richColors closeButton />
                <HardNavigationBridge>
                  <AppLayout>
                    <RouteNotFound entity="page" />
                  </AppLayout>
                </HardNavigationBridge>
              </ThemeProvider>
            </ApolloGraphqlProvider>
          </AuthInitializer>
        </Provider>
      </body>
    </html>
  );
}
