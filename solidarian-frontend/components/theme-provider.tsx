'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

function ThemeProvider({ children, ...props }: Readonly<React.ComponentProps<typeof NextThemesProvider>>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
