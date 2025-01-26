'use client';
import character9 from '@/assets/image/character-9.png';
import MoreButton from '@/components/common/button/MoreButton';
import SearchInput from '@/components/common/input/SearchInput';
import ListModal from '@/components/common/modal/MultiListModal';
import ChannelSlider from '@/components/home/ChannelSlider';
import ScheduleSlider from '@/components/home/ScheduleSlider';
import useCachedData from '@/hooks/useCachedData';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import usePostBlacklist from '@/hooks/usePostBlacklist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import useReservePush from '@/hooks/useReservePush';
import { useSchedule } from '@/hooks/useSchedule';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { useSetModalStore } from '@/stores/modal';
import { TContentsData } from '@/types/api/mongoDB';
import { TYChannelsData } from '@/types/api/youtube';
import { gtagClick } from '@/utils/gtag';
import { openWindow } from '@/utils/windowEvent';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import css from './page.module.scss';

type Props = {
  coverImgUrl: string;
  session: Session | null;
  recentChannels: TYChannelsData[];
};

export default function Client({ session, coverImgUrl, recentChannels }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const modalStore = useSetModalStore();
  const { whiteList, blackList } = useCachedData({ session });
  const t = useTranslations('home');
  const { data, isPending } = useSchedule({ enableAutoSync: false });

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

  const openMultiViewModal = async (content: TContentsData) => {
    await modalStore.push(ListModal, {
      id: 'multiViewModal',
      props: {
        defaultValue: generateVideoUrl(content.videoId),
      },
    });
  };

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

  const proceedScheduleData = useMemo(() => {
    if (!data) {
      return {
        liveContent: [],
        favoriteContent: [],
      };
    }

    const liveContent = data.live
      .filter((i) => !blackList.has(i.channelId))
      .slice(0, 19)
      .map((i) => ({ ...i, isFavorite: whiteList.has(i.channelId) }));

    const favoriteContent = data.all
      .slice() // copy
      .reverse()
      .filter((i) => whiteList.has(i.channelId))
      .slice(0, 19)
      .map((i) => ({ ...i, isFavorite: true }));

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
            🎤 <span className={css.highlight}>{t('live')}</span>
          </h2>
          <MoreButton href="/schedule?t=live" />
        </div>
        <ScheduleSlider
          isLoading={isPending}
          contents={proceedScheduleData.liveContent}
          addAlarm={reservePush}
          openNewTab={openStream}
          addMultiView={openMultiViewModal}
          addBlock={handleBlock}
          toggleFavorite={handleFavorite}
        />
      </section>

      {session && (
        <section className={css.favoriteSection}>
          <div className={css.favoriteNav}>
            <h2>🌟 {t('favorite')}</h2>
            <MoreButton href="/schedule?isFavorite=true" />
          </div>
          <ScheduleSlider
            isLoading={isPending}
            contents={proceedScheduleData.favoriteContent}
            addAlarm={reservePush}
            openNewTab={openStream}
            addMultiView={openMultiViewModal}
            addBlock={handleBlock}
            toggleFavorite={handleFavorite}
          />
        </section>
      )}

      <section className={css.searchSection}>
        <div className={css.searchNav}>
          <div />
          <h2>{t('searchSchedule')}</h2>
          <MoreButton href="/schedule" />
        </div>
        <div className={css.searchBox}>
          <SearchInput
            placeholder={t('searchInputPlaceholder')}
            value={query}
            onChange={onChangeQuery}
            onSubmit={onSearch}
          />
        </div>
      </section>

      <section className={css.recentChannelSection}>
        <div className={css.recentChannelNav}>
          <h2>🚚 {t('recentlyAddedChannel')}</h2>
          <MoreButton href="/channel?sort=createdAt" />
        </div>
        <ChannelSlider recentChannels={recentChannels} />
      </section>

      <section className={css.featureSection}>
        <div className={css.featureNav}>
          <h2>✨ {t('featured')}</h2>
        </div>
        <Link href="/featured">
          <div className={css.featureBox}>
            <div className={css.featuredContent}>
              <div className={css.patternBg}>
                <svg width="100%" height="100%">
                  <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.2)" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
                <div className={css.featuredOverlay}>
                  <h3>{t('featuredTitle')}</h3>
                  <p>{t('featuredDescription')}</p>
                </div>
                <div className={css.characterImage}>
                  <Image src={character9} alt="character" fill priority />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
