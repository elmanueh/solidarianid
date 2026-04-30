'use client';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  if (!resolvedTheme) {
    return (
      <Button type="button" variant={'outline'} className={'cursor-pointer'} disabled>
        <span className="relative inline-flex size-5 shrink-0" aria-hidden="true" />
        {` Cambiar tema`}
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      type="button"
      variant={'outline'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
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
