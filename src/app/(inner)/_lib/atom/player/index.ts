import { IINITIAL_PLAYER_VIDEO_ID } from '@/const';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const playerVideoIdAtom = atomWithStorage('playerVideoId', IINITIAL_PLAYER_VIDEO_ID);

export const playerStatusAtom = atom({
  isPlaying: false,
  isMutted: false,
  hide: true,
});

if (process.env.NODE_ENV === 'development') {
  playerVideoIdAtom.debugLabel = 'playerVideoIdAtom';
  playerStatusAtom.debugLabel = 'playerStatusAtom';
}
