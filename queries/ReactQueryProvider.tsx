'use client';
import addToast from '@/utils/handleToast';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { useState } from 'react';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [querClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError(error, query) {
            // console.error(error);
            addToast('error', '통신에러', false);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 1000 * 10, //10초
            refetchOnWindowFocus: false,
            retry: 3,
            retryDelay: 1000 * 3, //3초
            meta: {
              errorMessage: 'failed to fetch',
            },
          },
          mutations: {
            gcTime: 0,
            retry: false,
          },
        },
      }),
  );

  // const queryCache = querClient.getQueryCache();
  // queryCache.subscribe(({ type, query }) => {
  //   if (type !== 'updated' || query.state.status === 'pending') return;
  // });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
