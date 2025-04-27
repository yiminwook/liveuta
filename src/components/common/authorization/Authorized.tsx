'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  signInUrl: string;
}

/** children 하위 컴포넌트는 session이 있음을 보장 */
export function Authorized({ children, fallback, signInUrl }: Props) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace(signInUrl);
    }
  }, [session.status]);

  if (session.status === 'loading') return <>{fallback}</>;
  if (session.status === 'unauthenticated') return null;
  return <>{children}</>;
}
