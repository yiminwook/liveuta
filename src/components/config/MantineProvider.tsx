'use client';
import { THEME_STORAGE_KEY } from '@/libraries/mantine/config';
import { customLocalStorageColorSchemeManager } from '@/libraries/mantine/custom-theme-manager';
import { CustomMantineProvider as Provider } from '@/libraries/mantine/custom-theme-provider';
import { theme } from '@/styles/theme';
import { DatesProvider } from '@mantine/dates';
import { useEffect } from 'react';

import dayjs from '@/libraries/dayjs';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';

const colorSchemeManager = customLocalStorageColorSchemeManager({
  key: THEME_STORAGE_KEY,
});

type MantineProviderProps = {
  children: React.ReactNode;
  locale: string;
};

export default function MantineProvider({ children, locale }: MantineProviderProps) {
  useEffect(() => {
    // set global dayjs locale
    dayjs.locale(locale);
  }, [locale]);

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
