'use client';
import { useAppCtx } from '@/stores/app';
import { theme } from '@/styles/theme';
import { isDarkModeEnabled } from '@/utils/helper';
import { MantineProvider as Provider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ko';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

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
  const app = useAppCtx();
  const colorScheme = useStore(
    app,
    useShallow((state) => (isDarkModeEnabled(state.theme) ? 'dark' : 'light')),
  );

  return (
    <Provider
      classNamesPrefix="app" // ex) app-Button-root
      theme={theme}
      defaultColorScheme={colorScheme}
      withCssVariables={false} // css variable 동적으로 추가되지 않도록
    >
      <DatesProvider settings={{ locale }}>{children}</DatesProvider>
    </Provider>
  );
}
