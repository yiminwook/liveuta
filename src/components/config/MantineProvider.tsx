'use client';
import { COLOR_SCHEME_KEY } from '@/constants';
import { colorSchemeManager, theme } from '@/styles/theme';
import { MantineProvider as Provider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ko';

const manager = colorSchemeManager({
  key: COLOR_SCHEME_KEY,
});

type MantineProviderProps = {
  children: React.ReactNode;
  defaultColorScheme: 'light' | 'dark';
};

export default function MantineProvider({ children, defaultColorScheme }: MantineProviderProps) {
  return (
    <Provider theme={theme} colorSchemeManager={manager} defaultColorScheme={defaultColorScheme}>
      <DatesProvider settings={{ locale: 'ko' }}>{children}</DatesProvider>
    </Provider>
  );
}
