'use client';
import { useRouter } from '@bprogress/next';
import { Avatar, Text } from '@mantine/core';
import variable from '@variable';
import { Users, Video } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TYChannelsData } from '@/types/api/youtube';
import { renderSubscribe } from '@/utils/renderSubscribe';
import css from './channel-slider.module.scss';

type ChannelSliderProps = {
  recentChannels: TYChannelsData[];
};

export default function ChannelSlider({ recentChannels }: ChannelSliderProps) {
  const locale = useLocale();
  const { t } = useTranslations();
  const router = useRouter();

  const navigationChannel = (channelName: string) => {
    router.push(`/${locale}/channel?query-type=name&q=${channelName}`);
  };

  return (
    <div className={css.wrap}>
      <Swiper slidesPerGroup={1} slidesPerView={'auto'} centeredSlides={false} spaceBetween={10}>
        {recentChannels.map((item) => {
          const subscribe = renderSubscribe(
            item.statistics?.subscriberCount ?? t('home.channelSlider.hidden'),
          );
          const videoCount = item.statistics?.videoCount ?? t('home.channelSlider.hidden');
          return (
            <SwiperSlide
              key={`recentChannel_${item.uid}`}
              className={css.slide}
              onClick={() => navigationChannel(item.nameKor)}
            >
              <div className={css.card}>
                <div className={css.avatarFrame}>
                  <Avatar
                    radius="md"
                    size={52}
                    color={variable.firstColorDefault}
                    src={item.snippet?.thumbnails?.default?.url}
                  />
                </div>
                <div className={css.info}>
                  <Text size="xs" fw={600} lineClamp={1} className={css.name}>
                    {item.nameKor}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={1} className={css.enName}>
                    {item.snippet?.title}
                  </Text>
                  <div className={css.divider} />
                  <div className={css.stat}>
                    <Users size={10} />
                    <span>{subscribe}</span>
                  </div>
                  <div className={css.stat}>
                    <Video size={10} />
                    <span>{videoCount}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
