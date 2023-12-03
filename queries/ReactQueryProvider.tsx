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
          onError(error) {
            console.error(error);
            addToast('error', '통신에러', false);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 1000 * 10, //10초
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

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
};

export default ReacQueryProvider;
