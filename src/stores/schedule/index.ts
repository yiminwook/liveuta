import { atom } from 'jotai';

export const blacklistAtom = atom<Set<string>>(new Set([]));
export const whitelistAtom = atom<Set<string>>(new Set([]));

if (process.env.NODE_ENV === 'development') {
  blacklistAtom.debugLabel = 'blackListAtom';
  whitelistAtom.debugLabel = 'whiteListAtom';
}
