'use client';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { IconMoon, IconSun } from '@tabler/icons-react';

type ThemeToggleButtonProps = {
  className?: string;
};

export function ThemeToggleButton({ className }: Readonly<ThemeToggleButtonProps>) {
  const { resolvedTheme, setTheme } = useTheme();
  if (!resolvedTheme) {
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
