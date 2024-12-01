'use client';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { blacklistAtom, whitelistAtom } from '@/stores/schedule';
import { useIsFetching, useIsMutating, useQueries } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { channelListAtom } from '@/stores/common';
import axios from 'axios';
import { GetChannelRes } from '@api/v1/channel/route';

type LayoutDataObserverProps = {
  session: Session | null;
};

export default function LayoutDataObserver({ session }: LayoutDataObserverProps) {
  const setChannelList = useSetAtom(channelListAtom);
  const setBlacklist = useSetAtom(blacklistAtom);
  const setWhitelist = useSetAtom(whitelistAtom);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();

  const [channelList, blacklist, whitelist] = useQueries({
    queries: [
      {
        queryKey: ['channelList'],
        queryFn: () => axios.get<GetChannelRes>('/api/v1/channel').then((res) => res.data.data),
        gcTime: Infinity,
      },
      {
        queryKey: ['blacklist'],
        queryFn: () =>
          axios
            .get<{ message: string; data: string[] }>('/api/v1/blacklist', {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
              },
            })
            .then((res) => res.data.data),
        enabled: !!session,
        gcTime: Infinity,
      },
      {
        queryKey: ['whitelist'],
        queryFn: () =>
          axios
            .get<{ message: string; data: string[] }>('/api/v1/whitelist', {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
              },
            })
            .then((res) => res.data.data),
        enabled: !!session,
        gcTime: Infinity,
      },
    ],
  });

  useEffect(() => {
    if (!channelList.data) return;
    setChannelList(() => {
      const channelData = Object.fromEntries(
        channelList.data.map((channel) => {
          return [channel.channel_id, channel];
        }),
      );
      return channelData;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelList.data]);

  useEffect(() => {
    setBlacklist(() => new Set(blacklist.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blacklist.data]);

  useEffect(() => {
    setWhitelist(() => new Set(whitelist.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whitelist.data]);

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
