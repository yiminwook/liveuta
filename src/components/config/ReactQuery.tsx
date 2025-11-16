'use client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useModalStore } from '@/stores/modal';
import { useSession } from '@/stores/session';
import AlertModal from '../common/modal/AlertModal';

export default function ReactQuery({
  children,
  locale,
}: PropsWithChildren<{ locale: TLocaleCode }>) {
  const { t } = useTranslations();
  const signOut = useSession((state) => state.actions.signOut);

  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError(error, query) {
          console.log('RQProvider', error);
          const querykey = query.queryKey;
          if (querykey.includes('ignore')) return;
          // 에러 핸들링
          toast.error(t('global.config.reactQuery.communicationError'));
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 3, // 3분
          gcTime: 1000 * 60 * 5, // 5분
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          retry: (failureCount, error) => {
            // failureCount 0부터 시작
            if (
              error instanceof HTTPError &&
              [400, 401, 403, 404].includes(error.response.status)
            ) {
              // 400, 401, 403, 404 에러가 발생하면 재시도 하지 않음
              return false;
            }

            // 그 외의 경우 재시도 횟수를 3으로 설정
            return failureCount < 2;
          },
          retryDelay: 1000 * 5, //5초
          meta: {},
        },
        mutations: {
          gcTime: 0,
          retry: false,
        },
      },
    });
  });

  // const queryCache = querClient.getQueryCache();
  // queryCache.subscribe(({ type, query }) => {
  //   if (type !== 'updated' || query.state.status === 'pending') return;
  // });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
}
