'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/** children 하위 컴포넌트는 session이 없음을 보장 */
export default function UnAuthorized({ children, fallback }: Props) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/');
    }
  }, [session.status]);

  if (session.status === 'loading') return <>{fallback}</>;
  if (session.status === 'unauthenticated') return null;
  return <>{children}</>;
}
