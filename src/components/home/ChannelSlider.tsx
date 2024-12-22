'use client';
import { TYChannelsData } from '@/types/api/youtube';
import { renderSubscribe } from '@/utils/renderSubscribe';
import { Avatar, Box, Button, Center, HoverCard, Text, useMantineTheme } from '@mantine/core';
import variable from '@variable';
import { useRouter } from 'next-nprogress-bar';
import { IoIosMore } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ChannelSlider.module.scss';

type ChannelSliderProps = {
  recentChannels: TYChannelsData[];
};

export default function ChannelSlider({ recentChannels }: ChannelSliderProps) {
  const router = useRouter();
  const theme = useMantineTheme();

  const navigationChannel = (channelName: string) => {
    router.push(`/channel?q=${channelName}`);
  };

  return (
    <div className={css.wrap}>
      <Swiper slidesPerGroup={1} slidesPerView={'auto'} centeredSlides={false} spaceBetween={14}>
        {recentChannels.map((item) => {
          const subscribe = renderSubscribe(item.statistics.subscriberCount ?? '비공개');
          const videoCount = item.statistics.videoCount ?? '비공개';
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
                src={item.snippet.thumbnails?.default?.url}
              />
              <HoverCard withArrow width={200} offset={0} arrowOffset={0}>
                <HoverCard.Target>
                  <Center>
                    <Button
                      variant="transparent"
                      size="compact-xs"
                      className="swiper-no-swiping" // 슬라이드 이동 방지해야 hover 가능
                      w="100%"
                    >
                      <IoIosMore size="1.5rem" />
                    </Button>
                  </Center>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Box>
                    <Text size="sm">{item.channelName}</Text>
                    <Text size="sm" c="dimmed">
                      {item.snippet.title}
                    </Text>
                  </Box>

                  <Box mt="xs">
                    <Text size="xs">구독자 {subscribe}</Text>
                    <Text size="xs">영상 {videoCount}개</Text>
                  </Box>

                  <Box mt="xs">
                    <Center>
                      <Button
                        variant="light"
                        size="xs"
                        onClick={() => navigationChannel(item.channelName)}
                      >
                        채널로 검색하기
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
