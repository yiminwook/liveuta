'use client';
import useToast from '@/hook/useToast';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

export default function ReactQuery({ children }: PropsWithChildren) {
  const toast = useToast();
  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError(error, query) {
          console.log('RQProvider', error);
          const querykey = query.queryKey;
          if (querykey.includes('ignore')) return;
          // 에러 핸들링
          toast.error({ text: '통신에러' });
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 3, //3초
          gcTime: 1000 * 10, //10초
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          retry: 3,
          retryDelay: 1000 * 3, //3초
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
