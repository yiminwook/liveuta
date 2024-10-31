import { INITIAL_PLAYER_VIDEO_ID } from '@/constants';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const playerVideoIdAtom = atomWithReset(INITIAL_PLAYER_VIDEO_ID);

export const playerStatusAtom = atom({
  isPlaying: false,
  isMutted: false,
  hide: true,
  timeline: 0,
});

playerStatusAtom.onMount = (set) => {
  return () => {
    // 언마운트시 timeline 초기화
    set((pre) => ({ ...pre, timeline: 0 }));
  };
};

export const playerAtom = atom((get) => ({
  videoId: get(playerVideoIdAtom),
  ...get(playerStatusAtom),
}));

if (process.env.NODE_ENV === 'development') {
  playerVideoIdAtom.debugLabel = 'playerVideoIdAtom';
  playerStatusAtom.debugLabel = 'playerStatusAtom';
  playerAtom.debugLabel = 'playerAtom';
}
