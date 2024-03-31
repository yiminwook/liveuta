'use client';
import { global } from '@/style/globalTheme.css';
import * as themes from '@/style/theme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { themeAtom, themeStyleAtom } from '../_lib/atom';
import getCurrentTheme from '../_lib/getCustomTheme';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [currTheme] = useAtom(themeAtom);
  const [currThemeStyle, setCurrThemeStyle] = useAtom(themeStyleAtom);

  useEffect(() => {
    // :root
    document.documentElement.style.setProperty(
      '--liveuta-bg-color',
      currThemeStyle?.color?.first?.default,
    );
    document.documentElement.style.setProperty(
      '--liveuta-scroll-color',
      currThemeStyle?.color?.third?.default,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currThemeStyle]);

  useEffect(() => {
    setCurrThemeStyle((pre) => {
      if (currTheme === 'theme6') {
        const customTheme = getCurrentTheme();
        if (customTheme) return customTheme;
        else return pre;
      } else {
        return themes[currTheme];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currTheme]);

  return <div style={assignInlineVars(global, currThemeStyle)}>{children}</div>;
}
