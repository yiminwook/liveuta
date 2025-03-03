'use client';
import { theme } from '@/styles/theme';
import { TTheme } from '@/types';
import { isDarkModeEnabled } from '@/utils/helper';
import { LocalStorageColorSchemeManagerOptions, MantineColorSchemeManager } from '@mantine/core';
import { MantineProvider as Provider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { THEME_STORAGE_KEY } from './ThemeScript';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';

function localStorageColorSchemeManager({
  key = 'mantine-color-scheme',
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  // let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        const theme = window.localStorage.getItem(key) as TTheme;
        const mantineTheme = isDarkModeEnabled(theme) ? 'dark' : 'light';
        return mantineTheme || defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      // mantine color scheme manager는 직접 set하지 않는다.
    },

    subscribe: (onUpdate) => {
      // handleStorageEvent = (event) => {
      //   if (event.storageArea === window.localStorage && event.key === key) {
      //     console.log(event.newValue);
      //     if (!event.newValue) return;
      //     const isDark = isDarkModeEnabled(event.newValue as TTheme);
      //     onUpdate(isDark ? 'dark' : 'light');
      //   }
      // };
      // window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      // window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}

const colorSchemeManager = localStorageColorSchemeManager({
  key: THEME_STORAGE_KEY,
});

type MantineProviderProps = {
  children: React.ReactNode;
  defaultColorScheme?: 'light' | 'dark';
  locale: string;
};

export default function MantineProvider({
  children,
  defaultColorScheme,
  locale,
}: MantineProviderProps) {
  console.log('locale', locale);
  return (
    <Provider
      classNamesPrefix="app" // ex) app-Button-root
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      withCssVariables={false} // css variable 동적으로 추가되지 않도록
    >
      <DatesProvider settings={{ locale }}>{children}</DatesProvider>
    </Provider>
  );
}
