'use client';

import { Button } from '@/components/ui/button';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeToggleButtonProps = {
  className?: string;
};

export function ThemeToggleButton({ className }: Readonly<ThemeToggleButtonProps>) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button type="button" variant="outline" size="icon" className={className} aria-label="Cambiar tema" disabled>
        <span className="size-5" aria-hidden="true" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? IconMoon : IconSun;
  const nextTheme = isDark ? 'light' : 'dark';
  const ariaLabel = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={className}
      aria-label={ariaLabel}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="size-5" aria-hidden="true" />
    </Button>
  );
}
