'use client';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

export default function ReactQuery({ children }: PropsWithChildren) {
  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError(error, query) {
          console.log('RQProvider', error);
          const querykey = query.queryKey;
          if (querykey.includes('ignore')) return;
          // 에러 핸들링
          toast.error('통신에러');
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 3, // 3분
          gcTime: 1000 * 60 * 5, // 5분
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          retry: 3,
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
