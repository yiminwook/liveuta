'use client';
import { getAllChannelList } from '@inner/_action/channelList';
import { getAllBlacklist } from '@inner/_action/blacklist';
import { blacklistAtom, whitelistAtom } from '@inner/_lib/atom/schedule';
import serverActionHandler from '@inner/_lib/serverActionHandler';
import { useIsFetching, useIsMutating, useQueries } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import { useEffect, useLayoutEffect } from 'react';
import { channelListAtom } from './_lib/atom';
import { getAllWhitelist } from './_action/whitelist';
import useScheduleStatus from '@/hook/useScheduleStatus';
import { toast } from 'sonner';

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
        queryFn: () => serverActionHandler(getAllChannelList()),
        gcTime: Infinity,
      },
      {
        queryKey: ['blacklist'],
        queryFn: () =>
          serverActionHandler(getAllBlacklist({ accessToken: session!.user.accessToken })),
        enabled: !!session,
        gcTime: Infinity,
      },
      {
        queryKey: ['whitelist'],
        queryFn: () =>
          serverActionHandler(getAllWhitelist({ accessToken: session!.user.accessToken })),
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
    setBlacklist(() => new Set(blacklist.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blacklist.data]);

  useLayoutEffect(() => {
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
