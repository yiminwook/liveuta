import { THEME_CUSTOM_EVENT_NAME, THEME_STORAGE_KEY } from '@/components/config/ThemeScript';
import { TTheme } from '@/types';
import { gtagClick } from '@/utils/gtag';
import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

export type TAppState = {
  theme: TTheme;
  isShowAcctSidebar: boolean;
};

export type TAppAction = {
  setIsShowAcctSidebar: (isShow: boolean) => void;
  initTheme: () => void;
  setTheme: (theme: TTheme) => void;
};

export type TAppStore = TAppState & { actions: TAppAction };

export const createAppStore = (initState: TAppState) => {
  return createStore<TAppState & { actions: TAppAction }>((set, _get, _prev) => ({
    ...initState,
    actions: {
      initTheme: () => {
        let theme: TTheme = 'theme1';
        if (typeof localStorage !== 'undefined') {
          theme = (localStorage.getItem(THEME_STORAGE_KEY) as TTheme) || 'theme1';
        }
        set({ theme });
      },
      setTheme: (theme: TTheme) => {
        document.documentElement.dispatchEvent(
          new CustomEvent(THEME_CUSTOM_EVENT_NAME, { detail: { theme } }),
        );
        set(() => ({ theme }));

        gtagClick({
          target: 'themeSelect',
          content: theme,
          detail: theme,
          action: 'themeChange',
        });
      },
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
