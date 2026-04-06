'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui';

export default function SolidarianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <Toaster richColors closeButton /> {children}
    </ThemeProvider>
  );
}
