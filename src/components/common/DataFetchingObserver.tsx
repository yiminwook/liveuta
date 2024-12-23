'use client';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { TMemberInfo } from '@/libraries/oracleDB/auth/service';
import { useSetModalStore } from '@/stores/modal';
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import AlertModal from './modal/AlertModal';

type Props = {
  session: Session | null;
};

export default function DataFetchingObserver({ session }: Props) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();
  const modalActions = useSetModalStore();

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
    modalActions
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

  useEffect(() => {
    const unFetching = isFetching === 0 && isMutating === 0;

    if (status !== 'pending' && !unFetching) {
      toast.loading('서버와 통신중입니다.', {
        id: 'loading',
      });

      const timer = setTimeout(() => {
        // 로딩토스트가 5초이상 보이지 않도록 함
        toast.dismiss('loading');
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      toast.dismiss('loading');
    }
  }, [status, isFetching, isMutating]);

  return null;
}
