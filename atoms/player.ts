import { atom, useAtom } from 'jotai';

export const playerAtom = atom({
  url: 'https://www.youtube.com/watch?v=IiCKMyNuFYc',
  videoId: 'IiCKMyNuFYc',
  isPlaying: false,
  isMutted: false,
  hide: false,
});

export const usePlayerAtom = () => useAtom(playerAtom);

if (process.env.NODE_ENV === 'development') {
  playerAtom.debugLabel = 'playerAtom';
}
