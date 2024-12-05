'use client';
import { Session } from 'next-auth';
import Link from 'next/link';
import Nodata from '../common/Nodata';
import ScheduleCard from '../common/scheduleCard/Card';
import { VirtuosoGrid } from 'react-virtuoso';
import css from './ScheduleSection.module.scss';
import { Button, Loader } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { gtagClick } from '@/utils/gtag';
import { toast } from 'sonner';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import reservePush from '@/utils/reservePush';
import useInfiniteScheduleData from '@/hooks/useInfiniteScheduleData';
import useModalStore from '@/hooks/useModalStore';
import usePostBlacklist from '@/hooks/usePostBlacklist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import { TContentsData } from '@/types/api/mongoDB';
import ListModal from '../common/modal/MultiListModal';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { openWindow } from '@/utils/windowEvent';
import ScheduleNav from './ScheduleNav';
import dynamic from 'next/dynamic';
import { TScheduleDto } from '@/types/dto';
import variable from '@variable';
import BackHeader from '../common/header/BackHeader';
import TopBtn from './TopBtn';
import { useRef } from 'react';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

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
};

export default function ScheduleSection({
  session,
  content,
  length,
  scheduleDto,
  whiteList,
}: ScheduleSectionProps) {
  const modalStore = useModalStore();
  const scrollerRef = useRef<HTMLElement | null>(null);

  const { loadContents, isLoading, handleInfinityScroll } = useInfiniteScheduleData({
    rawData: content,
  });

  const mutateBlock = usePostBlacklist();
  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();

  const mutatePush = useMutation({
    mutationFn: reservePush,
    onSuccess: (response) => {
      gtagClick({
        target: 'sheduleAlarm',
        content: response.channelName,
        detail: response.title,
        action: 'alamReserve',
      });

      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReserve = async (content: TContentsData) => {
    if (mutatePush.isPending) return;
    const token = await generateFcmToken();

    if (token === undefined) {
      throw new Error('토큰을 가져오는데 실패했습니다.');
    }

    mutatePush.mutate({
      title: '스케줄 알림',
      body: `곧 ${content.channelName}의 방송이 시작됩니다.`,
      token,
      timestamp: content.timestamp.toString(),
      imageUrl: generateThumbnail(content.videoId, 'mqdefault'),
      link: generateVideoUrl(content.videoId),
      channelName: content.channelName,
    });
  };

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
    <section className={css.expand}>
      <VirtuosoGrid
        context={{
          isLoading,
        }}
        scrollerRef={(ref) => {
          if (ref) {
            scrollerRef.current = ref;
          }
        }}
        components={{
          Header: () => (
            <>
              <div className={css.position}>
                <div className={css.inner}>
                  <BackHeader />
                  <ScheduleNav
                    session={session}
                    scheduleDto={scheduleDto}
                    length={length}
                    isFavorite={false}
                  />
                </div>
              </div>
              <TopBtn />
              <TopSection filter={scheduleDto.filter} />
            </>
          ),
          Footer: ({ context }) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '4rem',
              }}
            >
              {context?.isLoading && <Loader color={variable.secondColorDefault} />}
            </div>
          ),
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
            addAlarm={handleReserve}
            addMultiView={openMutiViewModal}
            toggleFavorite={handleFavorite}
            addBlock={handleBlock}
          />
        )}
        overscan={0} // 0이상일시 maximum call stack size exceeded 에러 발생
        endReached={handleInfinityScroll}
        className={css.vertuso}
      />
    </section>
  );
}
