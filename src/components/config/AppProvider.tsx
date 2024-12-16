'use client';
import { AppContext, TAppState, createAppStore } from '@/stores/app';
import { useRef } from 'react';

type AppProviderProps = {
  children: React.ReactNode;
  initState: TAppState;
};

export default function AppProvider({ children, initState }: AppProviderProps) {
  const store = useRef(createAppStore(initState));

  return <AppContext.Provider value={store.current}>{children}</AppContext.Provider>;
}
