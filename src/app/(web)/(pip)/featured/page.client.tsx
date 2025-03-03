'use client';
import RankingTable from '@/components/featured/RankingTable';
import useCachedData from '@/hooks/useCachedData';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import usePostBlacklist from '@/hooks/usePostBlacklist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import { ClientOnly } from '@/libraries/clientOnly';
import dayjs from '@/libraries/dayjs';
import { TFeaturedDataAPIReturn } from '@/types/api/mongoDB';
import { TYChannelsData } from '@/types/api/youtube';
import { combineYTData } from '@/utils/combineChannelData-v2';
import { Button, ButtonGroup } from '@mantine/core';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './page.module.scss';

type Props = {
  featuredData: TFeaturedDataAPIReturn;
};

export default function Client({ featuredData }: Props) {
  const session = useSession().data;
  const { channelList, whiteList } = useCachedData({ session });
  const mutateBlock = usePostBlacklist();
  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();
  const t = useTranslations('featured');
  const locale = useLocale();

  const handleFavorite = (content: TYChannelsData) => {
    if (!session) return toast.error(t('notLoggedInError'));
    const isFavorite = whiteList.has(content.uid);

    if (!isFavorite && confirm(t('addFavoriteChannel'))) {
      mutatePostFavorite.mutate({
        session,
        channelId: content.uid,
      });
    } else if (isFavorite && confirm(t('removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: content.uid,
      });
    }
  };

  const handleBlock = (content: TYChannelsData) => {
    if (!session) return toast.error(t('notLoggedInError'));

    if (confirm(t('blockChannel'))) {
      mutateBlock.mutate({
        session,
        channelId: content.uid,
      });
    }
  };

  const isFavorite = (channelId: string) => whiteList.has(channelId);

  const combinedData = useMemo(() => {
    return {
      promising: combineYTData(channelList, featuredData.promising),
      topRating: combineYTData(channelList, featuredData.topRating),
    };
  }, [featuredData, channelList]);

  console.log('combinedData', featuredData.lastUpdateAt);

  return (
    <div className={css.container}>
      <p className={classNames('essential', css.essential)}>
        {t('essential')}&nbsp;
        <ClientOnly>
          <time>
            ({dayjs(featuredData.lastUpdateAt).locale(locale).format('YYYY-MM-DD HH:mm')})
          </time>
        </ClientOnly>
      </p>
      <div>
        <ButtonGroup>
          <Button className="swiper-prev" size="xs">
            이전
          </Button>
          <Button className="swiper-next" size="xs">
            다음
          </Button>
        </ButtonGroup>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        pagination={{ clickable: true }}
        className={css.swiper}
      >
        <SwiperSlide>
          <RankingTable
            title={t('topRating')}
            data={combinedData.topRating}
            onFavorite={handleFavorite}
            onBlock={handleBlock}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingTable
            title={t('promising')}
            data={combinedData.promising}
            onFavorite={handleFavorite}
            onBlock={handleBlock}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
