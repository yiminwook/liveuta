'use client';
import { AppContext, createAppStore } from '@/stores/app';
import { PlayerContext, createPlayerStore } from '@/stores/player';
import { useRef } from 'react';

type AppProviderProps = {
  children: React.ReactNode;
  initState: {
    defaultVideoId: string;
  };
};

export default function AppProvider({ children, initState }: AppProviderProps) {
  const appStore = useRef(
    createAppStore({
      isShowAcctSidebar: false,
    }),
  );

  const playerStore = useRef(
    createPlayerStore({
      videoId: initState.defaultVideoId,
      isPlaying: false,
      isMuted: false,
      isHide: true,
      timeline: 0,
    }),
  );

  return (
    <AppContext value={appStore.current}>
      <PlayerContext value={playerStore.current}>{children}</PlayerContext>
    </AppContext>
  );
}
