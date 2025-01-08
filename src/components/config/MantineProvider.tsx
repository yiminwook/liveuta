'use client';
import { theme } from '@/styles/theme';
import { MantineProvider as Provider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ko';

type MantineProviderProps = {
  children: React.ReactNode;
  defaultColorScheme: 'light' | 'dark';
  locale: string;
};

export default function MantineProvider({
  children,
  defaultColorScheme,
  locale,
}: MantineProviderProps) {
  return (
    <Provider
      classNamesPrefix="app" // ex) app-Button-root
      theme={theme}
      defaultColorScheme={defaultColorScheme}
      withCssVariables={false} // css variable 동적으로 추가되지 않도록
    >
      <DatesProvider settings={{ locale }}>{children}</DatesProvider>
    </Provider>
  );
}
