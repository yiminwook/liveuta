'use client';
import useToast from '@/hooks/useToast';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { useState } from 'react';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const toast = useToast();
  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError(error, query) {
          // console.error(error);
          toast.error({ text: '통신에러' });
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
          onError(error, query) {
            toast.error({ text: '통신에러' });
          },
        },
      },
    });
  });

  // const queryCache = querClient.getQueryCache();
  // queryCache.subscribe(({ type, query }) => {
  //   if (type !== 'updated' || query.state.status === 'pending') return;
  // });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
