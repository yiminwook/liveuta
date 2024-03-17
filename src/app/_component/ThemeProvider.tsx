'use client';
import * as themeStyles from '@/style/globalTheme.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useAtom } from 'jotai';
import { themeAtom, themeStyleAtom } from '../_lib/atom';
import { useLayoutEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [currTheme] = useAtom(themeAtom);
  const [currThemeStyle, setCurrTheme] = useAtom(themeStyleAtom);

  useLayoutEffect(() => {
    // :root
    document.documentElement.style.setProperty(
      '--liveuta-bg-color',
      themeStyles[currTheme].color.first.default,
    );
    document.documentElement.style.setProperty(
      '--liveuta-scroll-color',
      themeStyles[currTheme].color.third.default,
    );
    // div
    setCurrTheme(() => themeStyles[currTheme]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currTheme]);

  return <div style={assignInlineVars(themeStyles.global, currThemeStyle)}>{children}</div>;
}
