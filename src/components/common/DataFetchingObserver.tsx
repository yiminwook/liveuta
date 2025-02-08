'use client';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { TMemberInfo } from '@/libraries/oracleDB/auth/service';
import { useSetModalStore } from '@/stores/modal';
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { toast } from 'sonner';
import AlertModal from './modal/AlertModal';

type Props = {};

export default function DataFetchingObserver({}: Props) {
  const session = useSession().data;
  const t = useTranslations('global.dataFetchingObserver');
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();
  const modalActions = useSetModalStore();

  const { error } = useQuery({
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
          message: t('sessionExpired'),
        },
      })
      .then(() => {
        signOut({ callbackUrl: '/' });
      });
  }, [error]);

  useEffect(() => {
    const unFetching = isFetching === 0 && isMutating === 0;

    if (status !== 'pending' && !unFetching) {
      toast.loading(t('fetching'), {
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
