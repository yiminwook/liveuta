import { TTheme } from '@/types';
import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

export type TAppState = {
  theme: TTheme;
  isShowSidebar: boolean;
  isShowAcctSidebar: boolean;
};

export type TAppAction = {
  setTheme: (theme: TTheme) => void;
  setIsShowSidebar: (isShow: boolean) => void;
  setIsShowAcctSidebar: (isShow: boolean) => void;
};

export type TAppStore = TAppState & { actions: TAppAction };

export const createAppStore = (initState: TAppState) => {
  // get()은 좀 더 실시간으로 상태를 가져올 때 사용합니다.
  // prev는 이전 상태를 가져올 때 사용합니다.
  return createStore<TAppState & { actions: TAppAction }>((set, _get, _prev) => ({
    ...initState,
    actions: {
      setTheme: (theme) => set(() => ({ theme })),
      setIsShowSidebar: (isShow) => set(() => ({ isShowSidebar: isShow })),
      setIsShowAcctSidebar: (isShow) => set(() => ({ isShowAcctSidebar: isShow })),
    },
  }));
};

export const AppContext = createContext<ReturnType<typeof createAppStore> | null>(null);

export const useAppCtx = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within a AppProvider');
  return context;
};

// useAppStore는 selector 사용이 제한되어 구현하지 않습니다.
// 구현하더라도 타입 추론이 잘 되지않음.

export const useSetAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useSetApp must be used within a AppProvider');
  return useStore(context, (store) => store.actions);
};
