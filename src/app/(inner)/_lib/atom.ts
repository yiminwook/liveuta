import { atom, useAtom } from 'jotai';

export const sidebarStatusAtom = atom(false);

export const sidebarAtom = atom(
  (get) => get(sidebarStatusAtom),
  (_get, set, value?: boolean) => {
    set(sidebarStatusAtom, (pre) => (value === undefined ? !pre : value));
  },
);

export const useSidebarAtom = () => useAtom(sidebarAtom);

export const playerAtom = atom({
  url: 'https://www.youtube.com/watch?v=IiCKMyNuFYc',
  videoId: 'IiCKMyNuFYc',
  isPlaying: false,
  isMutted: false,
  hide: true,
});

export const usePlayerAtom = () => useAtom(playerAtom);

if (process.env.NODE_ENV === 'development') {
  playerAtom.debugLabel = 'playerAtom';
}
