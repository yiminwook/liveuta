'use client';
import { useSession } from '@/stores/session';

export function withSession<P extends { session: TSession | null }>(
  Component: React.ComponentType<P>,
) {
  return function WithSession(props: Omit<P, 'session'>) {
    const sessionStore = useSession();

    if (!sessionStore.hydrated) return null;
    if (!sessionStore.session) return null;
    return <Component {...(props as P)} session={sessionStore.session} />;
  };
}
