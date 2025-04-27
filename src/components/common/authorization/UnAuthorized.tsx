'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  homeUrl: string;
}

/** children 하위 컴포넌트는 session이 없음을 보장 */
export function UnAuthorized({ children, fallback, homeUrl }: Props) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace(homeUrl);
    }
  }, [session.status]);

  if (session.status === 'loading') return <>{fallback}</>;
  if (session.status === 'authenticated') return null;
  return <>{children}</>;
}
