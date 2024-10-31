import { atomWithReset } from 'jotai/utils';
import { ThemeType } from '@/types';
import { atom } from 'jotai';
import { theme1, darkBrandColor, whiteBrandColor } from '@/styles/theme';

export const themeAtom = atomWithReset<ThemeType>('theme1');

export const themeStyleAtom = atom(theme1);

export const darkModeAtom = atom(
  (get) => {
    const theme = get(themeStyleAtom);
    return theme?.color?.fourth?.default === '#262626';
  },
  (get, set) => {
    const theme = get(themeStyleAtom);
    const isDarkMode = theme?.color?.fourth?.default === '#262626';
    set(themeStyleAtom, (pre) => {
      pre.color.fourth = isDarkMode ? whiteBrandColor : darkBrandColor;
      return { ...pre };
    });
  },
);

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
  themeStyleAtom.debugLabel = 'themeStyleAtom';
}
