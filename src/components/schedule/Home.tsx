'use client';
import useCachedData from '@/hooks/useCachedData';
import { useAutoSync } from '@/hooks/useStorage';
import { GetScheduleRes } from '@/types/api/schedule';
import { TScheduleDto } from '@/types/dto';
import { addExcapeCharacter } from '@/utils/regexp';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { useMemo } from 'react';
import MainLoading from '../common/loading/MainLoading';
import ScheduleSection from './ScheduleSection';

type HomeProps = {
  scheduleDto: TScheduleDto;
  session: Session | null;
  isFavorite?: boolean;
};

export default function Home({ scheduleDto, session, isFavorite = false }: HomeProps) {
  const { isActive, refreshInterval } = useAutoSync();
  const { whiteList, blackList } = useCachedData({ session });

  const DEFAULT_CACHE_TIME = 3 * 60 * 100; // 3분
  const cacheTime = isActive ? refreshInterval * 60 * 100 : false;

  // a tag, window.location.href, window.location.reload() 등을 사용하여 페이지 이동시 캐시가 무효화됨
  const { data, isPending } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => axios.get<GetScheduleRes>('/api/v1/schedule').then((res) => res.data.data),
    staleTime: DEFAULT_CACHE_TIME, // 페이지 이동시 DEFAULT_CACHE_TIME 동안은 캐시를 사용, data feching이 발생하지 않음
    gcTime: DEFAULT_CACHE_TIME, // stale time이 지나지 않으면 로딩중에 stale된 data를 대신 보여줌, isPending과 관계가 있음
    refetchInterval: cacheTime, // 페이지내 동기화 주기, 같은 페이지내에서 주기적으로 호출
    refetchOnReconnect: isActive,
    refetchOnWindowFocus: isActive,
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
        whiteList={whiteList}
      />
      {isPending && <MainLoading backdrop />}
    </>
  );
}
