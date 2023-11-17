import { atomWithReset } from 'jotai/utils';
import { useAtom } from 'jotai';

/**
 * 로딩중 - null
 * 에러 - undefined
 * 성공 - string
 */
export const tokenAtom = atomWithReset<null | undefined | string>(null);
export const useTokenAtom = () => useAtom(tokenAtom);

if (process.env.NODE_ENV === 'development') {
  tokenAtom.debugLabel = 'tokenAtom';
}
