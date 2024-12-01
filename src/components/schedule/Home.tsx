'use client';
import { useQuery } from '@tanstack/react-query';
import ScheduleSection from './ScheduleSection';
import { TScheduleDto } from '@/types/dto';
import { Session } from 'next-auth';
import axios from 'axios';
import { GetScheduleRes } from '@/types/api/schedule';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { blacklistAtom, whitelistAtom } from '@/stores/schedule';
import { addExcapeCharacter } from '@/utils/regexp';
import MainLoading from '../common/loading/MainLoading';

const SCHEDULE_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

type HomeProps = {
  scheduleDto: TScheduleDto;
  session: Session | null;
  isFavorite?: boolean;
};

export default function Home({ scheduleDto, session, isFavorite = false }: HomeProps) {
  const whiteList = useAtomValue(whitelistAtom);
  const blackList = useAtomValue(blacklistAtom);

  const { data, isPending } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => axios.get<GetScheduleRes>('/api/v1/schedule').then((res) => res.data.data),
    staleTime: SCHEDULE_REFRESH_INTERVAL,
    gcTime: SCHEDULE_REFRESH_INTERVAL,
    refetchInterval: SCHEDULE_REFRESH_INTERVAL as number | false | undefined,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  const proceedScheduleData = useMemo(() => {
    if (!data) {
      return {
        content: [],
        length: {
          all: 0,
          stream: 0,
          video: 0,
        },
      };
    }

    const queryString = addExcapeCharacter(scheduleDto.query);
    const queryReg = new RegExp(queryString, 'i');

    let allCount = 0;
    let videoCount = 0;

    const filteredContent = data[scheduleDto.filter].filter((content) => {
      if (!queryReg.test(content.channelName)) return false;
      const inBlacklist = blackList.has(content.channelId);
      const inWhitelist = whiteList.has(content.channelId);

      let isPassList: boolean;
      if (isFavorite) {
        isPassList = inWhitelist;
      } else {
        isPassList = !inBlacklist;
      }

      let isPassType: boolean;

      switch (scheduleDto.select) {
        case 'stream':
          isPassType = !content.isVideo;
          break;
        case 'video':
          isPassType = content.isVideo;
          break;
        default:
          isPassType = true;
          break;
      }

      if (isPassList) allCount++;
      if (content.isVideo && isPassList) videoCount++;
      return isPassList && isPassType;
    });

    return {
      content: filteredContent,
      length: {
        all: allCount,
        stream: allCount - videoCount,
        video: videoCount,
      },
    };
  }, [data, scheduleDto, whiteList, blackList, isFavorite]);

  return (
    <>
      <ScheduleSection
        session={session}
        content={proceedScheduleData.content}
        length={proceedScheduleData.length}
        scheduleDto={scheduleDto}
      />
      {isPending && <MainLoading backdrop />}
    </>
  );
}
