import { TTheme } from '@/types';
import { atomWithReset } from 'jotai/utils';

export const themeAtom = atomWithReset<TTheme>('theme1');

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
}
