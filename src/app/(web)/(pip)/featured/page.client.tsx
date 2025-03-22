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
  const { channelMap, whiteListMap } = useCachedData({ session });
  const mutateBlock = usePostBlacklist();
  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();
  const t = useTranslations();
  const locale = useLocale();

  const handleFavorite = (content: TYChannelsData) => {
    if (!session) {
      toast.error(t('featured.notLoggedInError'));
      return;
    }

    const isFavorite = whiteListMap.has(content.uid);

    if (!isFavorite && confirm(t('featured.addFavoriteChannel'))) {
      mutatePostFavorite.mutate({
        session,
        channelId: content.uid,
      });
    } else if (isFavorite && confirm(t('featured.removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: content.uid,
      });
    }
  };

  const handleBlock = (content: TYChannelsData) => {
    if (!session) {
      toast.error(t('featured.notLoggedInError'));
      return;
    }

    if (confirm(t('featured.blockChannel'))) {
      mutateBlock.mutate({
        session,
        channelId: content.uid,
      });
    }
  };

  const isFavorite = (channelId: string) => whiteListMap.has(channelId);

  const combinedData = useMemo(() => {
    return {
      promising: combineYTData(channelMap, featuredData.promising),
      topRating: combineYTData(channelMap, featuredData.topRating),
    };
  }, [featuredData, channelMap]);

  return (
    <div className={css.container}>
      <p className={classNames('essential', css.essential)}>
        {t('featured.essential')}&nbsp;
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
            title={t('featured.topRating')}
            data={combinedData.topRating}
            onFavorite={handleFavorite}
            onBlock={handleBlock}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingTable
            title={t('featured.promising')}
            data={combinedData.promising}
            onFavorite={handleFavorite}
            onBlock={handleBlock}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
