'use client';

import { Button } from '@/components/ui';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

export function ThemeButton() {
  const { setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant={'outline'}
      onClick={() => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
      }}
      className={'cursor-pointer'}
    >
      <span className="relative inline-flex size-5 shrink-0" aria-hidden="true">
        <IconSun className="absolute inset-0 size-5 opacity-100 transition-opacity dark:opacity-0" />
        <IconMoon className="absolute inset-0 size-5 opacity-0 transition-opacity dark:opacity-100" />
      </span>
      {` Cambiar tema`}
    </Button>
  );
}
