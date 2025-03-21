'use client';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import useInfiniteScheduleData from '@/hooks/useInfiniteScheduleData';
import usePostBlacklist from '@/hooks/usePostBlacklist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import useReservePush from '@/hooks/useReservePush';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { useSetModalStore } from '@/stores/modal';
import { TContentsData } from '@/types/api/mongoDB';
import { TScheduleDto } from '@/types/dto';
import { gtagClick } from '@/utils/gtag';
import { openWindow } from '@/utils/windowEvent';
import { Button, Loader } from '@mantine/core';
import variable from '@variable';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { GridComponents, VirtuosoGrid } from 'react-virtuoso';
import { toast } from 'sonner';
import Nodata from '../common/Nodata';
import ScheduleCard from '../common/scheduleCard/Card';
import ScheduleCardSkeleton from '../common/scheduleCard/ScheduleCardSkeleton';
import css from './ScheduleSection.module.scss';

type ScheduleSectionProps = {
  session: Session | null;
  content: TContentsData[];
  length: {
    all: number;
    stream: number;
    video: number;
  };
  scheduleDto: TScheduleDto;
  whiteList: Set<string>;
  isLoading?: boolean;
};

export default function ScheduleSection({
  session,
  content,
  scheduleDto,
  whiteList,
  isLoading = false,
}: ScheduleSectionProps) {
  const modalStore = useSetModalStore();
  const t = useTranslations('schedule.scheduleSection');

  const {
    loadContents,
    isLoading: isLoadingScroll,
    handleInfinityScroll,
  } = useInfiniteScheduleData({
    rawData: content,
  });

  const mutateBlock = usePostBlacklist();
  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();
  const { reservePush } = useReservePush();

  const handleFavorite = (content: TContentsData) => {
    if (!session) return toast.error(t('notLoggedInError'));
    const isFavorite = whiteList.has(content.channelId);

    if (!isFavorite && confirm(t('addFavoriteChannel'))) {
      mutatePostFavorite.mutate({
        session,
        channelId: content.channelId,
      });
    } else if (isFavorite && confirm(t('removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: content.channelId,
      });
    }
  };

  const handleBlock = async (content: TContentsData) => {
    if (!session) return toast.error(t('notLoggedInError'));

    if (confirm(t('blockChannel'))) {
      mutateBlock.mutate({
        session,
        channelId: content.channelId,
      });
    }
  };

  const openStream = (content: TContentsData) => {
    gtagClick({
      target: 'scheduleCard',
      content: content.channelName,
      detail: content.title,
      action: 'openWindow',
    });

    openWindow(generateVideoUrl(content.videoId));
  };

  if (isLoading) {
    return (
      <section>
        <div className={css.list}>
          {new Array(10).fill(null).map((_, i) => (
            <div key={`placeholder_${i}`} className={css.item}>
              <ScheduleCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (content.length === 0 && scheduleDto.query.trim() !== '') {
    // 검색 결과가 없을 때
    return (
      <section>
        <Nodata />
        <div className={css.nodataLinkBox}>
          <Button component={Link} href={`/channel?q=${scheduleDto.query}`}>
            {t('searchAtChannelPage')}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <VirtuosoGrid
        context={{
          isLoading: isLoadingScroll,
        }}
        components={{
          Footer: ScrollFooter,
        }}
        totalCount={content.length}
        data={loadContents}
        listClassName={css.list}
        itemClassName={css.item}
        useWindowScroll
        itemContent={(_i, data) => (
          <ScheduleCard
            session={session}
            key={`scheduled_${data.videoId}`}
            content={data}
            showMenu
            isFavorite={whiteList.has(data.channelId)}
            openNewTab={openStream}
            addAlarm={reservePush}
            toggleFavorite={handleFavorite}
            addBlock={handleBlock}
          />
        )}
        overscan={0} // 0이상일시 maximum call stack size exceeded 에러 발생
        endReached={handleInfinityScroll}
      />
    </section>
  );
}

const ScrollFooter: GridComponents<{ isLoading: boolean }>['Footer'] = ({ context }) => {
  return (
    <div className={css.scrollFooter}>
      {context?.isLoading && <Loader color={variable.secondColorDefault} />}
    </div>
  );
};
