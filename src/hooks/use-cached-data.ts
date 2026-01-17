'use client';
import { TGetChannelRes } from '@api/v1/channel/route';
import { useQueries } from '@tanstack/react-query';
import ky from 'ky';
import { useMemo } from 'react';
import { clientApi } from '@/apis/fetcher';
import { CHANNEL_JSON_API } from '@/constants';
import { BLACKLIST_TAG, CHANNELS_TAG, WHITELIST_TAG } from '@/constants/revalidate-tag';

type LayoutDataObserverProps = {
  session: TSession | null;
};

const useCachedData = (args: LayoutDataObserverProps) => {
  const [channelList, blacklist, whitelist] = useQueries({
    queries: [
      {
        queryKey: [CHANNELS_TAG],
        queryFn: () =>
          ky
            .get<TGetChannelRes['data']>(CHANNEL_JSON_API)
            .json()
            .then((json) => json),
        gcTime: Infinity,
      },
      {
        queryKey: [BLACKLIST_TAG, args.session?.email],
        queryFn: () =>
          clientApi
            .get<{ message: string; data: string[] }>('v1/blacklist')
            .json()
            .then((json) => json.data),
        enabled: !!args.session,
        gcTime: Infinity,
      },
      {
        queryKey: [WHITELIST_TAG, args.session?.email],
        queryFn: () =>
          clientApi
            .get<{ message: string; data: string[] }>('v1/whitelist')
            .json()
            .then((json) => json.data),
        enabled: !!args.session,
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
