import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

export type TAppState = {
  isShowAcctSidebar: boolean;
};

export type TAppAction = {
  setIsShowAcctSidebar: (isShow: boolean) => void;
};

export type TAppStore = TAppState & { actions: TAppAction };

export const createAppStore = (initState: TAppState) => {
  return createStore<TAppState & { actions: TAppAction }>((set, _get, _prev) => ({
    ...initState,
    actions: {
      setIsShowAcctSidebar: (isShow) => set(() => ({ isShowAcctSidebar: isShow })),
    },
  }));
};

export const AppContext = createContext<ReturnType<typeof createAppStore> | null>(null);

export function useApp(): TAppStore;
export function useApp<T>(selector: (state: TAppStore) => T): T;
export function useApp<T>(selector?: (state: TAppStore) => T) {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within a AppProvider');
  return useStore(context, selector!);
}
