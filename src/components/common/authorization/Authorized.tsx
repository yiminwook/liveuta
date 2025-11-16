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
  const router = useRouter();
  const sessionStore = useSession();

  useEffect(() => {
    if (sessionStore.hydrated && sessionStore.session === null) {
      router.replace(signInUrl);
    }
  }, [sessionStore]);

  if (!sessionStore.hydrated) return <>{fallback}</>;
  if (!sessionStore.session) return null;
  return <>{children}</>;
}
