import { atomWithReset } from 'jotai/utils';
import { ThemeType } from '@/type';

export const themeAtom = atomWithReset<ThemeType>('theme1');

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
}
