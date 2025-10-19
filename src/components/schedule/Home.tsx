'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import Cookies from 'universal-cookie';
import useCachedData from '@/hooks/use-cached-data';
import { useScheduleQuery } from '@/hooks/use-schedule';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { useSession } from '@/stores/session';
import { TScheduleDto } from '@/types/dto';
import { addEscapeCharacter } from '@/utils/regexp';
import { useCmdActions } from '../common/command/Context';
import css from './Home.module.scss';
import ScheduleNav from './ScheduleNav';
import ScheduleSection from './ScheduleSection';
import TopSection from './TopSection';

type HomeProps = {
  scheduleDto: TScheduleDto;
};

export default function Home({ scheduleDto }: HomeProps) {
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const session = useSession();
  const { whiteListMap, channelMap, blackListMap } = useCachedData({ user: session.user });
  const { data, isPending } = useScheduleQuery({
    filter: scheduleDto.filter,
    enableAutoSync: true,
    locale,
  });

  const { addCmdGroup, removeCmdGroup } = useCmdActions();

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

    const filteredContent = data.filter((content) => {
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
      router.replace(`/${locale}/sign-in`);
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

    const filterId = 'schedule-filter';
    const typeId = 'schedule-type';

    addCmdGroup({
      id: typeId,
      heading: `${t('schedule.title')} - ${t('schedule.command.type')}`,
      commands: [
        {
          title: t('schedule.command.types.all'),
          fn: () => setVideoType('all'),
          keywords: ['schedule', '스케줄', 'スケジュール', '타입', 'type', 'タイプ'],
        },
        {
          title: t('schedule.command.types.stream'),
          fn: () => setVideoType('stream'),
          keywords: ['schedule', '스케줄', 'スケジュール', '타입', 'type', 'タイプ'],
        },
        {
          title: t('schedule.command.types.video'),
          fn: () => setVideoType('video'),
          keywords: ['schedule', '스케줄', 'スケジュール', '타입', 'type', 'タイプ'],
        },
      ],
    });
    addCmdGroup({
      id: filterId,
      heading: `${t('schedule.title')} - ${t('schedule.command.filter')}`,
      commands: [
        {
          title: t('schedule.command.filters.scheduled'),
          fn: () => setFilter('scheduled'),
          keywords: ['schedule', '스케줄', 'スケジュール', '필터', 'filter', 'フィルター'],
        },
        {
          title: t('schedule.command.filters.live'),
          fn: () => setFilter('live'),
          keywords: ['schedule', '스케줄', 'スケジュール', '필터', 'filter', 'フィルター'],
        },
        {
          title: t('schedule.command.filters.daily'),
          fn: () => setFilter('daily'),
          keywords: ['schedule', '스케줄', 'スケジュール', '필터', 'filter', 'フィルター'],
        },
        {
          title: t('schedule.command.filters.all'),
          fn: () => setFilter('all'),
          keywords: ['schedule', '스케줄', 'スケジュール', '필터', 'filter', 'フィルター'],
        },
      ],
    });

    return () => {
      removeCmdGroup(filterId);
      removeCmdGroup(typeId);
    };
  }, []);

  return (
    <>
      <div className={css.position}>
        <div className={css.inner}>
          <ScheduleNav
            user={session.user}
            scheduleDto={scheduleDto}
            length={proceedScheduleData.length}
          />
        </div>
      </div>
      {/* live player */}
      <TopSection filter={scheduleDto.filter} locale={locale} />
      <ScheduleSection
        user={session.user}
        scheduleDto={scheduleDto}
        channelMap={channelMap}
        contents={proceedScheduleData.content}
        whiteListMap={whiteListMap}
        isLoading={isPending}
      />
    </>
  );
}
