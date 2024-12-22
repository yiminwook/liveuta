'use client';
import AlertModal from '@/components/common/modal/AlertModal';
import { TMemberInfo } from '@/libraries/oracleDB/auth/service';
import { useSetModalStore } from '@/stores/modal';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export default function Client({ session, children }: Props) {
  const actions = useSetModalStore();

  const { data, error } = useQuery({
    queryKey: ['memberInfo'],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/v1/member', {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      })
        .then((res) => res.json() as Promise<{ data: TMemberInfo }>)
        .then((res) => res.data),
    enabled: !!session,
    staleTime: 1000 * 60, // 1분
  });

  useEffect(() => {
    if (!error) return;
    actions
      .push(AlertModal, {
        id: 'session-expired',
        props: {
          message: '세션이 만료 되었습니다.',
        },
      })
      .then(() => {
        signOut({ callbackUrl: '/' });
      });
  }, [error]);

  return <>{children}</>;
}
