'use client';
import RingLoader from '@/components/common/loading/RingLoader';
import { COLOR_SCHEME_KEY } from '@/constants';
import {
  createTheme,
  virtualColor,
  isMantineColorScheme,
  MantineColorScheme,
  MantineColorSchemeManager,
  LocalStorageColorSchemeManagerOptions,
  Loader,
} from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily:
    'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  colors: {
    main: virtualColor({
      name: 'main',
      light: '#fff',
      dark: '#000',
    }),
    text: virtualColor({
      name: 'text',
      light: '#000',
      dark: '#fff',
    }),
  },
});

export interface ColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `mantine-color-scheme` by default */
  key?: string;
}

export function colorSchemeManager({
  key = COLOR_SCHEME_KEY,
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        return (window.localStorage.getItem(key) as MantineColorScheme) || defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@mantine/core] Local storage color scheme manager was unable to save color scheme.',
          error,
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };

      window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}
