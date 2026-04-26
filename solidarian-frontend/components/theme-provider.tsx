'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

type ThemeContextValue = {
  theme?: Theme;
  resolvedTheme?: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = Readonly<React.PropsWithChildren>;

const STORAGE_KEY = 'theme';
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

function readStoredTheme(): Theme {
  const storedTheme = globalThis.localStorage.getItem(STORAGE_KEY);

  return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : 'system';
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme | undefined>(undefined);
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme | undefined>(undefined);

  React.useEffect(() => {
    setThemeState(readStoredTheme());
    setSystemTheme(getSystemTheme());
  }, []);

  React.useEffect(() => {
    if (!theme || !systemTheme) {
      return;
    }

    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    applyTheme(resolvedTheme);
    globalThis.localStorage.setItem(STORAGE_KEY, theme);
  }, [systemTheme, theme]);

  React.useEffect(() => {
    const media = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setSystemTheme(media.matches ? 'dark' : 'light');
    };

    handleChange();
    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, []);

  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setThemeState(
          event.newValue === 'light' || event.newValue === 'dark' || event.newValue === 'system'
            ? event.newValue
            : 'system'
        );
      }
    };

    globalThis.addEventListener('storage', handleStorage);

    return () => {
      globalThis.removeEventListener('storage', handleStorage);
    };
  }, []);

  let resolvedTheme: ResolvedTheme | undefined;

  if (theme === 'light' || theme === 'dark') {
    resolvedTheme = theme;
  } else if (theme === 'system') {
    resolvedTheme = systemTheme;
  }

  const contextValue = React.useMemo(() => ({ theme, resolvedTheme, setTheme: setThemeState }), [resolvedTheme, theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = React.useContext(ThemeContext);

  return (
    context ?? {
      theme: undefined,
      resolvedTheme: undefined,
      setTheme: () => undefined,
    }
  );
}

export { ThemeProvider, useTheme };
