'use client';

import { themeCookie } from '@/models/theme';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeProviderProps {
  /** cookie에서 theme을 가져옴
   *
   * undefind이면 Theme 인스턴스 생성시에 쿠키를 생성
   *
   * */
  initialTheme: string | undefined;
  children: React.ReactNode;
}

const ThemeContext = createContext({
  currentTheme: 'theme1',
  setTheme: (theme: string) => {},
  resetTheme: () => {},
});

type ThemeValue = ReturnType<typeof useTheme>;

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string | undefined>(initialTheme);

  const handleSetTheme = useCallback((theme: string) => {
    themeCookie.setState(theme);
    setTheme(() => theme);
  }, []);

  const handelResetTheme = useCallback(() => {
    themeCookie.reset();
    setTheme(() => 'theme1');
  }, []);

  const ThemeValue: ThemeValue = useMemo(() => {
    return {
      currentTheme: theme || 'theme1',
      setTheme: handleSetTheme,
      resetTheme: handelResetTheme,
    };
  }, [theme]);

  useEffect(() => {
    //initialize theme
    if (!initialTheme) {
      console.log('initialize theme');
      const currentTheme = themeCookie.currentTheme;
      setTheme(() => currentTheme);
    }
  }, []);

  return <ThemeContext.Provider value={ThemeValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
