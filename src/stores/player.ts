import { createContext, useContext } from 'react';
import { create, useStore } from 'zustand';

export type TPlayerState = {
  videoId: string;
  isPlaying: boolean;
  isMuted: boolean;
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
      setTimeline: (timeline) => set(() => ({ timeline, isHide: false, isPlaying: true })),
      reset: () => set(() => initState),
      resetTimeline: () => set(() => ({ timeline: 0 })),
      setIsHide: (isHide) => set(() => ({ isHide })),
      toggleIsHide: () => set((state) => ({ isHide: !state.isHide })),
      setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
      toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setIsMuted: (isMuted) => set(() => ({ isMuted })),
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
