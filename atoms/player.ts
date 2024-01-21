import { atom, useAtom } from 'jotai';

export const playerAtom = atom({
  url: '',
  videoId: '',
  isPlaying: false,
  isMutted: false,
  pip: false,
});

export const usePlayerAtom = () => useAtom(playerAtom);

export const isPipAtom = atom(
  (get) => get(playerAtom).pip,
  (_, set, update: boolean) => {
    set(playerAtom, (pre) => ({ ...pre, pip: update }));
  },
);

export const useIsPipAtom = () => useAtom(isPipAtom);

if (process.env.NODE_ENV === 'development') {
  playerAtom.debugLabel = 'playerAtom';
}
