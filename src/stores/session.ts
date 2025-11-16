import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dayjs from '@/libraries/dayjs';

type TSessionState = {
  session: TSession | null;
  hydrated: boolean;
  loginAt: Date | null;
};

type TSessionAction = {
  signIn: (args: { session: TSession }) => void;
  refreshSession: (args: { session: TSession }) => void;
  signOut: () => void;
};

export type TSessionStore = TSessionState & { actions: TSessionAction };

export const useSession = create<TSessionStore>()(
  persist(
    (set) => ({
      hydrated: false,
      session: null,
      loginAt: null,
      actions: {
        signIn: (args: { session: TSession }) => {
          set(() => ({ session: args.session, loginAt: dayjs().toDate() }));
        },
        refreshSession: (args: { session: TSession }) => {
          set(() => ({ session: args.session }));
        },
        signOut: () => {
          set(() => ({ session: null, loginAt: null }));
        },
      },
    }),
    {
      name: 'LIVEUTA_SESSION',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        session: state.session,
        loginAt: state.loginAt,
      }),
      merge: (_persistedState, currentState) => {
        const persistedState = _persistedState as Pick<TSessionState, 'session' | 'loginAt'>;

        return {
          ...currentState,
          ...persistedState,
          hydrated: true,
        };
      },
    },
  ),
);
