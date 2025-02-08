'use client';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export default function withSession<P extends { session: Session }>(
  Component: React.ComponentType<P>,
) {
  return function WithSession(props: Omit<P, 'session'>) {
    const session = useSession().data;
    if (!session) return null;
    return <Component {...(props as P)} session={session} />;
  };
}
