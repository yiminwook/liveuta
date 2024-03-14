import { atomWithReset } from 'jotai/utils';
import { ThemeType } from '@/type';
import { atom } from 'jotai';
import { theme1 } from '@/style/globalTheme.css';

export const themeAtom = atomWithReset<ThemeType>('theme1');

export const themeStyleAtom = atom(theme1);

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
}
