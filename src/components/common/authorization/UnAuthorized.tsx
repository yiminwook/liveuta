'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from '@/stores/session';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  homeUrl: string;
}

/** children 하위 컴포넌트는 session이 없음을 보장 */
export function UnAuthorized({ children, fallback, homeUrl }: Props) {
  const router = useRouter();
  const sessionStore = useSession();

  useEffect(() => {
    if (sessionStore.hydrated && sessionStore.session !== null) {
      router.replace(homeUrl);
    }
  }, [sessionStore]);

  if (!sessionStore.hydrated) return <>{fallback}</>;
  if (sessionStore.session !== null) return null;
  return <>{children}</>;
}
