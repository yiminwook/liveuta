'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function Administrator({ children, fallback }: Props) {
  const session = useSession();
  const router = useRouter();
  const userLv = session.data?.user.userLv;

  // userLv
  // 1 - Memember
  // 2 - VIP Memember
  // 3 - Admin
  // 4 - Collaborator
  // 5 - Maintenance
  useEffect(() => {
    if (userLv && userLv < 3) {
      router.replace('/ko/not-found');
    }
  }, [userLv]);

  if (session.status === 'loading') return <>{fallback}</>;
  if (session.status === 'unauthenticated') return null;
  if (userLv && userLv < 3) return null;
  return <>{children}</>;
}
