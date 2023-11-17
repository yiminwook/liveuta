import { atomWithReset } from 'jotai/utils';
import { useAtom } from 'jotai';

export const tokenAtom = atomWithReset('');
export const useTokenAtom = () => useAtom(tokenAtom);

if (process.env.NODE_ENV === 'development') {
  tokenAtom.debugLabel = 'tokenAtom';
}
