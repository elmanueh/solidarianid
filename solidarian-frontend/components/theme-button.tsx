import { Button } from '@/components/ui';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Button variant={'outline'} onClick={() => setTheme(isDark ? 'light' : 'dark')} className={'cursor-pointer'}>
      {isDark ? <IconSun /> : <IconMoon />} Cambiar tema
    </Button>
  );
}
