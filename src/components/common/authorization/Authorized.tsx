'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from '@/stores/session';

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
    if (session.isLoading === false && session.user === null) {
      router.replace(signInUrl);
    }
  }, [session]);

  if (session.isLoading) return <>{fallback}</>;
  if (!session.user) return null;
  return <>{children}</>;
}
