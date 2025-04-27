'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Administrator({ children }: { children: React.ReactNode }) {
  const session = useSession().data!;
  const router = useRouter();
  const userLv = session.user.userLv;

  // userLv
  // 1 - Memember
  // 2 - VIP Memember
  // 3 - Admin
  // 4 - Collaborator
  // 5 - Maintenance
  useEffect(() => {
    if (userLv < 3) {
      router.replace('/ko/not-found');
    }
  }, [userLv]);

  if (userLv < 3) return null;
  return <>{children}</>;
}
