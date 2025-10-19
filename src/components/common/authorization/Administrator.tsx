'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInfo } from '@/hooks/use-user-info';
import { useSession } from '@/stores/session';

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function Administrator({ children, fallback }: Props) {
  const router = useRouter();

  const session = useSession();
  const userInfo = useUserInfo({ user: session.user });

  // userLv
  // 1 - Memember
  // 2 - VIP Memember
  // 3 - Admin
  // 4 - Collaborator
  // 5 - Maintenance
  useEffect(() => {
    if (userInfo.data?.userLv && userInfo.data?.userLv < 3) {
      router.replace('/ko/not-found');
    }
  }, [userInfo.data?.userLv]);

  if (session.isLoading || userInfo.isPending) return <>{fallback}</>;
  if (!session.user) return null;
  if (userInfo.data?.userLv && userInfo.data.userLv < 3) return null;
  return <>{children}</>;
}
