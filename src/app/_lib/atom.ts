import { atomWithReset } from 'jotai/utils';
import { atom, useAtom } from 'jotai';
import { ThemeType } from '@/type';

export const themeAtom = atomWithReset<ThemeType>('theme1');
export const useThemeAtom = () => useAtom(themeAtom);

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
}
