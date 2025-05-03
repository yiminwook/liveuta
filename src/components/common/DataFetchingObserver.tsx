'use client';
import { clientApi } from '@/apis/fetcher';
import { MEMBER_TAG } from '@/constants/revalidateTag';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { TMemberInfo } from '@/libraries/oracleDB/auth/service';
import { useSetModalStore } from '@/stores/modal';
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import AlertModal from './modal/AlertModal';

type Props = {
  locale: TLocaleCode;
};

export default function DataFetchingObserver({ locale }: Props) {
  const { data: session } = useSession();
  const { t } = useTranslations();
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();
  const modalActions = useSetModalStore();

  const { error } = useQuery({
    queryKey: [MEMBER_TAG],
    queryFn: () =>
      clientApi
        .get<{ data: TMemberInfo }>('v1/member', {
          headers: { Authorization: session ? `Bearer ${session.user.accessToken}` : '' },
        })
        .json()
        .then((json) => json.data),
    enabled: !!session,
    staleTime: 1000 * 60, // 1분
  });

  useEffect(() => {
    if (!error) return;
    modalActions
      .push(AlertModal, {
        id: 'session-expired',
        props: {
          message: t('global.dataFetchingObserver.sessionExpired'),
          locale,
        },
      })
      .then(() => {
        signOut({ callbackUrl: '/' });
      });
  }, [error]);

  useEffect(() => {
    const unFetching = isFetching === 0 && isMutating === 0;

    if (status !== 'pending' && !unFetching) {
      toast.loading(t('global.dataFetchingObserver.fetching'), {
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
