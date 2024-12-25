'use client';
import { SCHEDULE_CACHE_TIME } from '@/constants';
import useCachedData from '@/hooks/useCachedData';
import { useAutoSync } from '@/hooks/useStorage';
import { GetScheduleRes } from '@/types/api/schedule';
import { TScheduleDto } from '@/types/dto';
import { addEscapeCharacter } from '@/utils/regexp';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import css from './Home.module.scss';
import ScheduleNav from './ScheduleNav';
import ScheduleSection from './ScheduleSection';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

type HomeProps = {
  scheduleDto: TScheduleDto;
  session: Session | null;
};

export default function Home({ scheduleDto, session }: HomeProps) {
  const { isActive, refreshInterval } = useAutoSync();
  const { whiteList, channelList, blackList } = useCachedData({ session });

  const cacheTime = isActive ? refreshInterval * 60 * 1000 : false;

  // a tag, window.location.href, window.location.reload() 등을 사용하여 페이지 이동시 캐시가 무효화됨
  const { data, isPending } = useQuery({
    queryKey: ['schedule'],
    queryFn: () =>
      fetch('/api/v1/schedule', { next: { revalidate: 10, tags: ['schedule'] } })
        .then((res) => res.json() as Promise<GetScheduleRes>)
        .then((json) => json.data),
    staleTime: SCHEDULE_CACHE_TIME, // 페이지 이동시 SCHEDULE_CACHE_TIME 동안은 캐시를 사용, data-fetching이 발생하지 않음
    gcTime: SCHEDULE_CACHE_TIME, // stale time이 지나지 않으면 data-fetch 중에 stale된 data를 대신 보여줌, isPending과 관계가 있음
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

    const queryString = addEscapeCharacter(scheduleDto.query);
    const queryReg = new RegExp(queryString, 'i');

    let allCount = 0;
    let videoCount = 0;

    const filteredContent = data[scheduleDto.filter].filter((content) => {
      const channelNames = channelList[content.channelId]?.names.join(' ') || '';
      if (!queryReg.test(channelNames)) return false;
      const inBlacklist = blackList.has(content.channelId);
      const inWhitelist = whiteList.has(content.channelId);

      let isPassList: boolean;

      if (scheduleDto.isFavorite) {
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
  }, [data, scheduleDto, whiteList, blackList]);

  return (
    <>
      <div className={css.position}>
        <div className={css.inner}>
          <ScheduleNav
            session={session}
            scheduleDto={scheduleDto}
            length={proceedScheduleData.length}
          />
        </div>
      </div>
      {/* live player */}
      <TopSection filter={scheduleDto.filter} />
      <ScheduleSection
        session={session}
        content={proceedScheduleData.content}
        length={proceedScheduleData.length}
        scheduleDto={scheduleDto}
        whiteList={whiteList}
        isLoading={isPending}
      />
    </>
  );
}
