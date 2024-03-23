'use client';
import { getAllChannelList } from '@inner/_action/channelList';
import { getAllBlackList } from '@inner/_action/blacklist';
import { blackListAtom } from '@inner/_lib/atom/schedule';
import serverActionHandler from '@inner/_lib/serverActionHandler';
import { useQueries } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import { useLayoutEffect } from 'react';
import { channelListAtom } from './_lib/atom';

type LayoutDataObserverProps = {
  session: Session | null;
};

export default function LayoutDataObserver({ session }: LayoutDataObserverProps) {
  const setChannelList = useSetAtom(channelListAtom);
  const setBlackList = useSetAtom(blackListAtom);

  const [channelList, blackList] = useQueries({
    queries: [
      {
        queryKey: ['channelList'],
        queryFn: () => serverActionHandler(getAllChannelList()),
        gcTime: Infinity,
      },
      {
        queryKey: ['blackList'],
        queryFn: () =>
          serverActionHandler(getAllBlackList({ accessToken: session!.user.accessToken })),
        enabled: !!session,
        gcTime: Infinity,
      },
    ],
  });

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    setBlackList(() => new Set(blackList.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blackList.data]);

  return null;
}
