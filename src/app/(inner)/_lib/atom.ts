import { atom, useAtom } from 'jotai';

export const sidebarAtom = atom(false);
export const useSidebarAtom = () => useAtom(sidebarAtom);

export const accountSidebarAtom = atom(false);
export const useAccountSidebarAtom = () => useAtom(accountSidebarAtom);

export const playerAtom = atom({
  videoId: 'IiCKMyNuFYc',
  isPlaying: false,
  isMutted: false,
  hide: true,
});

export const usePlayerAtom = () => useAtom(playerAtom);

if (process.env.NODE_ENV === 'development') {
  playerAtom.debugLabel = 'playerAtom';
}
