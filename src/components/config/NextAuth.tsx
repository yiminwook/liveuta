'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export default function NextAuth({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
