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
import { Link } from '@/i18n/routing';
import { GridComponents, VirtuosoGrid } from 'react-virtuoso';
import { toast } from 'sonner';
import Nodata from '../common/Nodata';
import ListModal from '../common/modal/MultiListModal';
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

  const openMutiViewModal = async (content: TContentsData) => {
    await modalStore.push(ListModal, {
      id: 'multiViewModal',
      props: {
        defaultValue: generateVideoUrl(content.videoId),
      },
    });
  };

  const handleFavorite = (content: TContentsData) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');
    const isFavorite = whiteList.has(content.channelId);

    if (!isFavorite && confirm('즐겨찾기에 추가하시겠습니까?')) {
      mutatePostFavorite.mutate({
        session,
        channelId: content.channelId,
      });
    } else if (isFavorite && confirm('즐겨찾기에서 제거하시겠습니까?')) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: content.channelId,
      });
    }
  };

  const handleBlock = async (content: TContentsData) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');

    if (confirm('해당 채널을 블럭 하시겠습니까?')) {
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
            채널페이지에서 검색
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
            addMultiView={openMutiViewModal}
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
