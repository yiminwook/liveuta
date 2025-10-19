'use client';
import { User } from 'firebase/auth';
import { useSession } from '@/stores/session';

export function withSession<P extends { user: User | null }>(Component: React.ComponentType<P>) {
  return function WithSession(props: Omit<P, 'user'>) {
    const session = useSession();

    if (session.isLoading) return null;
    if (!session.user) return null;
    return <Component {...(props as P)} user={session.user} />;
  };
}
