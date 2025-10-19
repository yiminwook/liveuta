'use client';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useScheduleStatus } from '@/hooks/use-schedule';
import { useUserInfo } from '@/hooks/use-user-info';
import FirebaseClient from '@/libraries/firebase/client';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useSetModalStore } from '@/stores/modal';
import { useSession } from '@/stores/session';
import AlertModal from './modal/AlertModal';

type Props = {
  locale: TLocaleCode;
};

export default function DataFetchingObserver({ locale }: Props) {
  const { user } = useSession();
  const { t } = useTranslations();
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();
  const modalActions = useSetModalStore();

  const { error } = useUserInfo({ user });

  console.log('user info error', error);

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
      .then(() => signOut(FirebaseClient.getInstance().auth));
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
