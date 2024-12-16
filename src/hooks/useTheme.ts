import { useAppCtx } from '@/stores/app';
import { TTheme } from '@/types';
import { isDarkModeEnabled } from '@/utils/helper';
import Cookies from 'universal-cookie';
import { useStore } from 'zustand';

const useTheme = () => {
  const appCtx = useAppCtx();
  const theme = useStore(appCtx, (state) => state.theme);
  const setThemeStore = useStore(appCtx, (state) => state.actions.setTheme);

  const setCookie = (theme: TTheme) => {
    const themeCookie = new Cookies();
    themeCookie.set('theme', theme, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
  };

  const setAttribute = (theme: TTheme) => {
    const isDarkMode = isDarkModeEnabled(theme);
    document.documentElement.setAttribute('color', theme);
    document.documentElement.setAttribute(
      'data-mantine-color-scheme',
      isDarkMode ? 'dark' : 'light',
    );
  };

  const setTheme = (theme: TTheme) => {
    setCookie(theme);
    setAttribute(theme);
    setThemeStore(theme);
  };

  const resetTheme = () => {
    setTheme('theme1');
  };

  return {
    theme,
    setTheme,
    resetTheme,
  };
};

export default useTheme;
