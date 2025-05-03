'use client';
import { clientApi } from '@/apis/fetcher';
import { BLACKLIST_TAG, CHANNELS_TAG, WHITELIST_TAG } from '@/constants/revalidate-tag';
import { TGetChannelRes } from '@api/v1/channel/route';
import { useQueries } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useMemo } from 'react';

type LayoutDataObserverProps = {
  session: Session | null;
};

const useCachedData = ({ session }: LayoutDataObserverProps) => {
  const [channelList, blacklist, whitelist] = useQueries({
    queries: [
      {
        queryKey: [CHANNELS_TAG],
        queryFn: () =>
          clientApi
            .get<TGetChannelRes>('v1/channel')
            .json()
            .then((json) => json.data),
        gcTime: Infinity,
      },
      {
        queryKey: [BLACKLIST_TAG],
        queryFn: () =>
          clientApi
            .get<{ message: string; data: string[] }>('v1/blacklist', {
              headers: { Authorization: session ? `Bearer ${session.user.accessToken}` : '' },
            })
            .json()
            .then((json) => json.data),
        enabled: !!session,
        gcTime: Infinity,
      },
      {
        queryKey: [WHITELIST_TAG],
        queryFn: () =>
          clientApi
            .get<{ message: string; data: string[] }>('v1/whitelist', {
              headers: { Authorization: session ? `Bearer ${session.user.accessToken}` : '' },
            })
            .json()
            .then((json) => json.data),
        enabled: !!session,
        gcTime: Infinity,
      },
    ],
  });

  const channelMap = useMemo(() => {
    if (!channelList.data) return {};
    const channelData = Object.fromEntries(
      channelList.data.map((channel) => {
        return [channel.channel_id, channel];
      }),
    );
    return channelData;
  }, [channelList.data]);

  const blackListMap = useMemo(() => {
    return new Set(blacklist.data);
  }, [blacklist.data]);

  const whiteListMap = useMemo(() => {
    return new Set(whitelist.data);
  }, [whitelist.data]);

  return {
    channelMap,
    blackListMap,
    whiteListMap,
  };
};

export default useCachedData;
