'use client';
import { AppContext, TAppState, createAppStore } from '@/stores/app';
import { useMultiViewStore } from '@/stores/multiView';
import { useEffect, useRef } from 'react';

type AppProviderProps = {
  children: React.ReactNode;
  initState: TAppState;
};

export default function AppProvider({ children, initState }: AppProviderProps) {
  const store = useRef(createAppStore(initState));

  useEffect(() => {
    useMultiViewStore.persist.rehydrate();
  }, []);

  // useStorageDOMEvents(useMultiViewStore);

  return <AppContext.Provider value={store.current}>{children}</AppContext.Provider>;
}
