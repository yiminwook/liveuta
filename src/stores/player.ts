import { INITIAL_PLAYER_VIDEO_ID } from '@/constants';
import { create } from 'zustand';

export type TPlayerState = {
  videoId: string;
  isPlaying: boolean;
  isMutted: boolean;
  isHide: boolean;
  timeline: number;
};

export type TPlayerAction = {
  setVideo: (videoId: string) => void;
  prepareSetlist: (videoId: string, timeline: number) => void;
  setTimeline: (timeline: number) => void;
  resetTimeline: () => void;
  reset: () => void;
  setIsHide: (isHide: boolean) => void;
  toggleIsHide: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleIsPlaying: () => void;
};

export type TPlayerStore = TPlayerState & { actions: TPlayerAction };

const INITIAL_STATE: TPlayerState = {
  videoId: INITIAL_PLAYER_VIDEO_ID,
  isPlaying: false,
  isMutted: false,
  isHide: true,
  timeline: 0,
};

export const usePlayerStore = create<TPlayerStore>((set, _get, _state) => ({
  ...INITIAL_STATE,
  actions: {
    setVideo: (videoId) => {
      // 사용자의 타임라인을 0으로 초기화
      set(() => ({ videoId, timeline: 0, isHide: false, isPlaying: true }));
    },
    prepareSetlist: (videoId, timeline) => {
      // 자동재생 되지 않도록 설정
      set(() => ({ videoId, timeline, isHide: false, isPlaying: false }));
    },
    setTimeline: (timeline) => set(() => ({ timeline, isHide: false, isPlaying: true })),
    reset: () => set(() => INITIAL_STATE),
    resetTimeline: () => set(() => ({ timeline: 0 })),
    setIsHide: (isHide) => set(() => ({ isHide })),
    toggleIsHide: () => set((state) => ({ isHide: !state.isHide })),
    setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  },
}));
