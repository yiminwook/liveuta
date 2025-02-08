'use client';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

// https://next-auth.js.org/getting-started/client#sessionprovider
export default function NextAuth({ children }: Props) {
  return (
    <SessionProvider refetchInterval={10 * 60} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
