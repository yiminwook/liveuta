'use client';
import { global } from '@/style/globalTheme.css';
import * as themes from '@/style/theme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { themeAtom, themeStyleAtom } from '../_lib/atom';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [currTheme] = useAtom(themeAtom);
  const [currThemeStyle, setCurrThemeStyle] = useAtom(themeStyleAtom);

  useEffect(() => {
    setCurrThemeStyle(() => themes[currTheme]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currTheme]);

  return <div style={assignInlineVars(global, currThemeStyle)}>{children}</div>;
}
