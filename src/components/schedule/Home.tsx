'use client';
import useCachedData from '@/hooks/useCachedData';
import { useSchedule } from '@/hooks/useSchedule';
import { TScheduleDto } from '@/types/dto';
import { addEscapeCharacter } from '@/utils/regexp';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { useCommandActions } from '../common/command/Context';
import css from './Home.module.scss';
import ScheduleNav from './ScheduleNav';
import ScheduleSection from './ScheduleSection';
import TopSection from './TopSection';

type HomeProps = {
  scheduleDto: TScheduleDto;
};

export default function Home({ scheduleDto }: HomeProps) {
  const session = useSession().data;
  const { whiteListMap, channelMap, blackListMap } = useCachedData({ session });
  const { data, isPending } = useSchedule({ enableAutoSync: true });
  const router = useRouter();
  const { addCmdGroup, removeCmdGroup } = useCommandActions();
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      const channelNames = channelMap[content.channelId]?.names?.join(' ') || '';
      if (!queryReg.test(channelNames)) return false;
      const inBlacklist = blackListMap.has(content.channelId);
      const inWhitelist = whiteListMap.has(content.channelId);

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
  }, [data, scheduleDto, whiteListMap, blackListMap, channelMap]);

  useEffect(() => {
    if (scheduleDto.isFavorite && !session) {
      router.replace('/login');
    }

    const setFilter = (value: string) => {
      const query = new URLSearchParams(searchParams);
      if (value === 'scheduled') {
        query.delete('t');
      } else {
        query.set('t', value);
      }
      router.push(`${pathname}?${query.toString()}`);
    };

    const setVideoType = (value: string) => {
      const selectCookie = new Cookies();
      selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
      router.refresh();
    };

    const filterLabel = t('schedule.command.filter');
    const typeLabel = t('schedule.command.type');

    addCmdGroup({
      heading: t('schedule.title'),
      commands: [
        {
          title: `${filterLabel} | ${t('schedule.command.filters.scheduled')}`,
          fn: () => setFilter('scheduled'),
          keywords: ['schedule', 'filter'],
        },
        {
          title: `${filterLabel} | ${t('schedule.command.filters.live')}`,
          fn: () => setFilter('live'),
          keywords: ['schedule', 'filter'],
        },
        {
          title: `${filterLabel} | ${t('schedule.command.filters.daily')}`,
          fn: () => setFilter('daily'),
          keywords: ['schedule', 'filter'],
        },
        {
          title: `${filterLabel} | ${t('schedule.command.filters.all')}`,
          fn: () => setFilter('all'),
          keywords: ['schedule', 'filter'],
        },
        {
          title: `${typeLabel} | ${t('schedule.command.types.all')}`,
          fn: () => setVideoType('all'),
          keywords: ['schedule', 'type'],
        },
        {
          title: `${typeLabel} | ${t('schedule.command.types.stream')}`,
          fn: () => setVideoType('stream'),
          keywords: ['schedule', 'type'],
        },
        {
          title: `${typeLabel} | ${t('schedule.command.types.video')}`,
          fn: () => setVideoType('video'),
          keywords: ['schedule', 'type'],
        },
      ],
    });

    return () => removeCmdGroup(t('schedule.title'));
  }, []);

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
        scheduleDto={scheduleDto}
        channelMap={channelMap}
        contents={proceedScheduleData.content}
        whiteListMap={whiteListMap}
        isLoading={isPending}
      />
    </>
  );
}
