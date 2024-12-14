'use client';
import { useRef } from 'react';
import { AppContext, createAppStore } from '@/stores/app';

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  const store = useRef(createAppStore({ theme: 'light' }));

  return <AppContext.Provider value={store.current}>{children}</AppContext.Provider>;
}
