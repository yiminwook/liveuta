'use client';
import * as globalStyles from '@/style/global.css';
import * as themeStyles from '@/style/globalTheme.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useAtom } from 'jotai';
import { themeAtom, themeStyleAtom } from '../_lib/atom';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [currTheme] = useAtom(themeAtom);
  const [currThemeStyle, setCurrTheme] = useAtom(themeStyleAtom);

  useEffect(() => {
    setCurrTheme(() => themeStyles[currTheme]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currTheme]);

  return (
    <div
      className={globalStyles.background}
      style={assignInlineVars(themeStyles.global, currThemeStyle)}
    >
      {children}
    </div>
  );
}
