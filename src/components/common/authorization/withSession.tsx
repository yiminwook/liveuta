'use client';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export function withSession<P extends { session: Session }>(Component: React.ComponentType<P>) {
  return function WithSession(props: Omit<P, 'session'>) {
    const session = useSession();

    if (session.status === 'loading') return null;
    if (session.status === 'unauthenticated') return null;
    return <Component {...(props as P)} session={session.data!} />;
  };
}
