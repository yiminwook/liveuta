'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { TYChannelsData } from '@/types/api/youtube';
import { renderSubscribe } from '@/utils/renderSubscribe';
import IonIosMore from '@icons/ion/IosMore';
import { Avatar, Box, Button, Center, HoverCard, Text } from '@mantine/core';
import variable from '@variable';
import { useRouter } from 'next-nprogress-bar';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ChannelSlider.module.scss';

type ChannelSliderProps = {
  recentChannels: TYChannelsData[];
};

export default function ChannelSlider({ recentChannels }: ChannelSliderProps) {
  const { t, i18n } = useTranslations();
  const locale = i18n.language as TLocaleCode;
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navigationChannel = (channelName: string) => {
    router.push(`/${locale}/channel?q=${channelName}`);
  };

  return (
    <div className={css.wrap} ref={containerRef}>
      <Swiper slidesPerGroup={1} slidesPerView={'auto'} centeredSlides={false} spaceBetween={14}>
        {recentChannels.map((item) => {
          const subscribe = renderSubscribe(
            item.statistics?.subscriberCount ?? t('home.channelSlider.hidden'),
          );
          const videoCount = item.statistics?.videoCount ?? t('home.channelSlider.hidden');
          return (
            <SwiperSlide key={`recentChannel_${item.uid}`} style={{ width: '75px' }}>
              <Avatar
                radius="md"
                styles={{
                  root: {
                    borderColor: variable.thirdColorDefault,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    width: '100%',
                    height: '100%',
                  },
                }}
                color={variable.firstColorDefault}
                src={item.snippet?.thumbnails?.default?.url}
              />
              <HoverCard
                withArrow
                width={200}
                offset={0}
                arrowOffset={0}
                portalProps={{
                  target: containerRef.current!,
                }}
              >
                <HoverCard.Target>
                  <Center>
                    <Button
                      variant="transparent"
                      size="compact-xs"
                      className="swiper-no-swiping" // 슬라이드 이동 방지해야 hover 가능
                      w="100%"
                    >
                      <IonIosMore width="1.5rem" height="1.5rem" />
                    </Button>
                  </Center>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Box>
                    <Text size="sm">{item.nameKor}</Text>
                    <Text size="sm" c="dimmed">
                      {item.snippet?.title}
                    </Text>
                  </Box>

                  <Box mt="xs">
                    <Text size="xs">
                      {t('home.channelSlider.subscribers')} {subscribe}
                    </Text>
                    <Text size="xs">
                      {t('home.channelSlider.videos')} {videoCount}
                    </Text>
                  </Box>

                  <Box mt="xs">
                    <Center>
                      <Button
                        variant="light"
                        size="xs"
                        onClick={() => navigationChannel(item.nameKor)}
                      >
                        {t('home.channelSlider.navigationChannel')}
                      </Button>
                    </Center>
                  </Box>
                </HoverCard.Dropdown>
              </HoverCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
