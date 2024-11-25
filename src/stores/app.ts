import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

type State = {};

type Action = {
  actions: {};
};

type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (initState: State) => {
  return createStore<State & Action>((set, get) => ({
    ...initState,
    actions: {},
  }));
};

export const AppContext = createContext<AppStore | null>(null);

export const useAppCtx = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within a AppProvider');
  return context;
};

export const useSetApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useSetApp must be used within a AppProvider');
  return useStore(context, (store) => store.actions);
};
