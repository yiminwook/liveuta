'use client';
import { AppContext, createAppStore } from '@/stores/app';
import { useMultiViewStore } from '@/stores/multiView';
import { PlayerContext, createPlayerStore } from '@/stores/player';
import { TTheme } from '@/types';
import { useEffect, useRef } from 'react';

type AppProviderProps = {
  children: React.ReactNode;
  initState: {
    theme: TTheme;
    defaultVideoId: string;
  };
};

export default function AppProvider({ children, initState }: AppProviderProps) {
  const appStore = useRef(
    createAppStore({
      theme:
        typeof window !== 'undefined'
          ? (localStorage.getItem('theme') as TTheme) || 'theme1'
          : 'theme1',
      isShowAcctSidebar: false,
    }),
  );

  const playerStore = useRef(
    createPlayerStore({
      videoId: initState.defaultVideoId,
      isPlaying: false,
      isMutted: false,
      isHide: true,
      timeline: 0,
    }),
  );

  useEffect(() => {
    useMultiViewStore.persist.rehydrate();
  }, []);

  // useStorageDOMEvents(useMultiViewStore);

  return (
    <AppContext value={appStore.current}>
      <PlayerContext value={playerStore.current}>{children}</PlayerContext>
    </AppContext>
  );
}
