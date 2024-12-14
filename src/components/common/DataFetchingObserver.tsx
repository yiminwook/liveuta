'use client';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useEffect } from 'react';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { toast } from 'sonner';

export default function DataFetchingObserver() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();

  useEffect(() => {
    const unFetching = isFetching === 0 && isMutating === 0;

    if (status !== 'pending' && !unFetching) {
      toast.loading('서버와 통신중입니다.', {
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
