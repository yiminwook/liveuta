import { themeAtom } from '@/stores/atom';
import { ThemeType } from '@/types';
import { useAtom } from 'jotai';
import Cookies from 'universal-cookie';

const useTheme = () => {
  const [theme, setThemeAtome] = useAtom(themeAtom);

  const setCookie = (theme: ThemeType) => {
    const themeCookie = new Cookies();
    themeCookie.set('theme', theme, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
  };

  const setAttribute = (theme: ThemeType) => {
    document.documentElement.setAttribute('color', theme);
  };

  const setTheme = (theme: ThemeType) => {
    setCookie(theme);
    setAttribute(theme);
    setThemeAtome(() => theme);
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
