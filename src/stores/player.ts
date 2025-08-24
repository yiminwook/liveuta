import { createContext, useContext } from 'react';
import { create, useStore } from 'zustand';
import YouTubeIFrameCtrl from '@/libraries/youtube/iframe-controller';

export type TPlayerState = {
  videoId: string;
  isPlaying: boolean;
  isMuted: boolean;
  isHide: boolean;
  timeline: number;

  controller: YouTubeIFrameCtrl | null;
  volume: number;
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

  setController: (controller: YouTubeIFrameCtrl) => void;
  resetController: () => void;

  setVolume: (volume: number) => void;
  incrementVolume: () => void;
  decrementVolume: () => void;
  toggleMuted: () => void;
  setIsMuted: (isMuted: boolean) => void;
};

export type TPlayerStore = TPlayerState & { actions: TPlayerAction };

export const createPlayerStore = (initState: TPlayerState) => {
  return create<TPlayerStore>((set, _get, _state) => ({
    ...initState,
    actions: {
      setVideo: (videoId) => {
        // 사용자의 타임라인을 0으로 초기화
        set(() => ({ videoId, timeline: 0, isHide: false, isPlaying: true }));
      },
      prepareSetlist: (videoId, timeline) => {
        // 자동재생 되지 않도록 설정
        set(() => ({ videoId, timeline, isHide: false, isPlaying: false }));
      },

      setIsHide: (isHide) => set(() => ({ isHide })),
      toggleIsHide: () => set((state) => ({ isHide: !state.isHide })),

      setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
      toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),

      setIsMuted: (isMuted) => set(() => ({ isMuted })),
      toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),

      setController: (controller) => set(() => ({ controller })),
      resetController: () => set(() => ({ controller: null })),

      setVolume: (volume) => set(() => ({ volume })),
      incrementVolume: () => set((state) => ({ volume: Math.min(state.volume + 5, 100) })),
      decrementVolume: () => set((state) => ({ volume: Math.max(state.volume - 5, 0) })),

      setTimeline: (timeline) => set(() => ({ timeline, isHide: false, isPlaying: true })),
      resetTimeline: () => set(() => ({ timeline: 0 })),

      reset: () => set(() => initState),
    },
  }));
};

export const PlayerContext = createContext<ReturnType<typeof createPlayerStore> | null>(null);

export function usePlayer(): TPlayerStore;
export function usePlayer<T>(selector: (state: TPlayerStore) => T): T;
export function usePlayer<T>(selector?: (state: TPlayerStore) => T) {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return useStore(context, selector!);
}
