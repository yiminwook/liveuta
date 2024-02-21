import { atomWithReset } from 'jotai/utils';
import { atom, useAtom } from 'jotai';
import { SelectType, ThemeType } from '@/type';

export const themeAtom = atomWithReset<ThemeType>('theme1');
export const useThemeAtom = () => useAtom(themeAtom);

export const selectAtom = atomWithReset<SelectType>('all');
export const useSelectAtom = () => useAtom(selectAtom);

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
  selectAtom.debugLabel = 'selectAtom';
}
