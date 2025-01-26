'use client';
import useCachedData from '@/hooks/useCachedData';
import { useSchedule } from '@/hooks/useSchedule';
import { TScheduleDto } from '@/types/dto';
import { addEscapeCharacter } from '@/utils/regexp';
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
  const { whiteList, channelList, blackList } = useCachedData({ session });
  const { data, isPending } = useSchedule({ enableAutoSync: true });

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
      const channelNames = channelList[content.channelId]?.names?.join(' ') || '';
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
  }, [data, scheduleDto, whiteList, blackList, channelList]);

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
