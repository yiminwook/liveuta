import { createLocalStorage } from '@/libraries/zustand/customStorage';
import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const MULTI_VIEW_KEY = 'multi-view';
export const MULTI_VIEW_VERSION = 1;

type TMultiViewState = {
  list: string[];
};

type TMultiViewAction = {
  add: (viewId: string) => void;
  remove: (viewId: string) => void;
  removeByIdx: (idx: number) => void;
  reset: () => void;
};

type TMultiViewStore = TMultiViewState & { actions: TMultiViewAction };

// https://zustand.docs.pmnd.rs/integrations/persisting-store-data#storage
export const useMultiViewStore = create<TMultiViewStore>()(
  persist(
    (set, _get, _prev) => {
      return {
        list: [],
        actions: {
          add: (viewId) =>
            set((state) => {
              const timmedViewId = viewId.trim();
              if (timmedViewId === '') return state;
              if (state.list.length >= 4) return state;
              return { list: [...state.list, timmedViewId] };
            }),
          remove: (viewId) => set((state) => ({ list: state.list.filter((id) => id !== viewId) })),
          removeByIdx: (idx) => set((state) => ({ list: state.list.filter((_, i) => i !== idx) })),
          reset: () => set({ list: [] }),
        },
      };
    },
    {
      skipHydration: true, // 클라이언트 사이드에서 rehydrate 해야함.
      version: MULTI_VIEW_VERSION, // 버전체크는 자동으로 됨
      name: MULTI_VIEW_KEY,
      merge(_persistedState, currentState) {
        // merge actions and validation check
        if (!_persistedState) return currentState;
        const persistedState = _persistedState as {
          list: unknown;
        };
        const list = z.array(z.string()).parse(persistedState.list);
        return { ...currentState, list };
      },
      partialize(state) {
        return { list: state.list };
      },
      storage: createLocalStorage(),
    },
  ),
);
