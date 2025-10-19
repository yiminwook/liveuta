import { User } from 'firebase/auth';
import { create } from 'zustand';

type TSessionState = {
  user: User | null;
  isLoading: boolean;
};

type TSessionAction = {
  signIn: (use: User | null) => void;
  signOut: () => void;
};

export type TSessionStore = TSessionState & TSessionAction;

export const useSession = create<TSessionStore>((set) => ({
  user: null,
  isLoading: true,
  signIn: (user: User | null) => set(() => ({ user, isLoading: false })),
  signOut: () => set(() => ({ user: null })),
}));
