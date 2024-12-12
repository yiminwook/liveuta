'use client';
import SearchInput from '@/components/common/input/SearchInput';
import ListModal from '@/components/common/modal/MultiListModal';
import ChannelSlider from '@/components/home/ChannelSlider';
import ScheduleSlider from '@/components/home/ScheduleSlider';
import { SCHEDULE_CACHE_TIME } from '@/constants';
import useCachedData from '@/hooks/useCachedData';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import useModalStore from '@/hooks/useModalStore';
import usePostBlacklist from '@/hooks/usePostBlacklist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import useReservePush from '@/hooks/useReservePush';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { TContentsData } from '@/types/api/mongoDB';
import { GetScheduleRes } from '@/types/api/schedule';
import { gtagClick } from '@/utils/gtag';
import { openWindow } from '@/utils/windowEvent';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import css from './page.module.scss';

type Props = {
  coverImgUrl: string;
  session: Session | null;
};

export default function Client({ coverImgUrl, session }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const modalStore = useModalStore();
  const { whiteList, blackList } = useCachedData({ session });

  const { data, isPending } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => axios.get<GetScheduleRes>('/api/v1/schedule').then((res) => res.data.data),
    staleTime: SCHEDULE_CACHE_TIME,
    gcTime: SCHEDULE_CACHE_TIME,
  });

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  };

  const onSearch = () => {
    const trimmedQuery = query.trim();
    const params = new URLSearchParams();
    params.set('q', trimmedQuery);
    params.set('t', 'all');
    router.push(`/schedule?${params.toString()}`);
  };

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

  const proceedScheduleData = useMemo(() => {
    if (!data) {
      return {
        liveContent: [],
        favoriteContent: [],
      };
    }

    const liveContent = data.live.slice(0, 19);

    const favoriteContent = [...data.all.reverse()]
      .filter((i) => whiteList.has(i.channelId))
      .slice(0, 19);

    return {
      liveContent,
      favoriteContent,
    };
  }, [data, whiteList, blackList]);

  return (
    <main className={css.homeMain}>
      <section className={css.heroSection}>
        <div className={css.coverImageBox}>
          <Image className="blur" src={coverImgUrl} alt="blur-image" fill />
          <Image src={coverImgUrl} alt="cover-image" fill />
        </div>
      </section>

      <section className={css.liveSection}>
        <div className={css.liveNav}>
          <h2>
            현재 <span className={css.hightlight}>라이브</span> 중
          </h2>
          <a href="/schedule?t=live">more</a>
        </div>
        <ScheduleSlider
          isLoading={isPending}
          contents={proceedScheduleData.liveContent}
          whiteList={whiteList}
          addAlarm={reservePush}
          openNewTab={openStream}
          addMultiView={openMutiViewModal}
          addBlock={handleBlock}
          toggleFavorite={handleFavorite}
        />
      </section>

      {session && (
        <section className={css.favoriteSection}>
          <div className={css.favoriteNav}>
            <h2>즐겨찾기</h2>
            <a href="/favorite">more</a>
          </div>
          <ScheduleSlider
            isLoading={isPending}
            contents={proceedScheduleData.favoriteContent}
            whiteList={whiteList}
            addAlarm={reservePush}
            openNewTab={openStream}
            addMultiView={openMutiViewModal}
            addBlock={handleBlock}
            toggleFavorite={handleFavorite}
          />
        </section>
      )}

      <section className={css.searchSection}>
        <div className={css.searchNav}>
          <div />
          <h2>스케줄을 검색해보세요</h2>
          <a href="/schedule">more</a>
        </div>
        <div className={css.searchBox}>
          <SearchInput
            placeholder="채널명으로 검색"
            value={query}
            onChange={onChangeQuery}
            onEnterPress={onSearch}
          />
        </div>
      </section>

      <section className={css.recentChannelSection}>
        <div className={css.recentChannelNav}>
          <h2>최근 추가된 채널</h2>
          <a href="/">more</a>
        </div>
        <ChannelSlider />
      </section>

      {/* <section className={css.featureSection}>
        <div className={css.featureBox}>
          <div className={css.leftCol}></div>
          <div className={css.rightCol}>
            <div className={css.row}></div>
            <div className={css.row}></div>
            <div className={css.row}></div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
