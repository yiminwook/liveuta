'use client';
import { useQueries } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useMemo } from 'react';
import axios from 'axios';
import { GetChannelRes } from '@api/v1/channel/route';

type LayoutDataObserverProps = {
  session: Session | null;
};
const useCachedData = ({ session }: LayoutDataObserverProps) => {
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

  const channelData = useMemo(() => {
    if (!channelList.data) return {};
    const channelData = Object.fromEntries(
      channelList.data.map((channel) => {
        return [channel.channel_id, channel];
      }),
    );
    return channelData;
  }, [channelList.data]);

  const blackListData = useMemo(() => {
    return new Set(blacklist.data);
  }, [blacklist.data]);

  const whiteListData = useMemo(() => {
    return new Set(whitelist.data);
  }, [whitelist.data]);

  return {
    channelList: channelData,
    blackList: blackListData,
    whiteList: whiteListData,
  };
};

export default useCachedData;
