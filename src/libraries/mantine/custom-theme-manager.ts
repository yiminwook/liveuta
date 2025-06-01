import { TTheme } from '@/types';

export interface LocalStorageColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `mantine-color-scheme-value` by default */
  key?: string;
}

export interface CustomColorSchemeManager {
  /** Function to retrieve color scheme value from external storage, for example window.localStorage */
  get: (defaultValue: TTheme) => TTheme;
  /** Function to set color scheme value in external storage, for example window.localStorage */
  set: (value: TTheme) => void;
  /** Function to subscribe to color scheme changes triggered by external events */
  subscribe: (onUpdate: (colorScheme: TTheme) => void) => void;
  /** Function to unsubscribe from color scheme changes triggered by external events */
  unsubscribe: () => void;
  /** Function to clear value from external storage */
  clear: () => void;
}

export function customLocalStorageColorSchemeManager({
  key = 'mantine-color-scheme',
}: LocalStorageColorSchemeManagerOptions = {}): CustomColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        const theme = window.localStorage.getItem(key) || 'theme1';
        return theme as TTheme;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.warn(
          '[@mantine/core] Local storage color scheme manager was unable to save color scheme.',
          error,
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          const theme = window.localStorage.getItem(key) || 'theme1';
          onUpdate(theme as TTheme);
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
