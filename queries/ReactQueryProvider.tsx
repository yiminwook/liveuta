'use client';
import addToast from '@/utils/handleToast';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { useState } from 'react';

interface ReacQueryProviderProps {
  children: React.ReactNode;
}

const ReacQueryProvider = ({ children }: ReacQueryProviderProps) => {
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
            onError(error, variables, context) {
              console.log('variables', variables);
              console.log('context', context);
            },
            onSettled(data, error, variables, context) {
              console.log('data', data);
              console.log('error', error);
              console.log('variables', variables);
              console.log('context', context);
            },
          },
        },
      }),
  );

  const queryCache = querClient.getQueryCache();
  queryCache.subscribe(({ type, query }) => {
    if (type !== 'updated' || query.state.status === 'pending') return;
    console.log('type', type);
    console.log('query', query);
    console.log('queryKey', query?.queryKey);
    console.log('data', query.state.data);
    console.log('status', query.state.status);
    console.log('error', query.state.error);
  });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
};

export default ReacQueryProvider;
