'use client';
import { TChannelData, TContentData } from '@/types/api/mongoDB';
import variable from '@variable';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCard from '../common/scheduleCard/SliderCard';
import SliderCardSkeleton from '../common/scheduleCard/SliderCardSkeleton';
import css from './ScheduleSlider.module.scss';

type ScheduleSliderProps = {
  contents: (TContentData & { isFavorite: boolean })[];
  channelMap: Record<string, TChannelData>;
  isLoading?: boolean;
  addAlarm?: (item: TContentData, channel: TChannelData | undefined) => void;
  openNewTab?: (item: TContentData) => void;
  toggleFavorite?: (item: TContentData) => void;
  addBlock?: (item: TContentData) => void;
};

export default function ScheduleSlider({
  contents,
  channelMap,
  addAlarm,
  openNewTab,
  toggleFavorite,
  addBlock,
  isLoading,
}: ScheduleSliderProps) {
  if (isLoading) {
    return (
      <Swiper
        className={css.container}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerGroup={1}
        slidesPerView="auto"
        allowTouchMove
        breakpoints={{
          [variable.breakpointXs]: {
            slidesPerView: 2,
          },
          [variable.breakpointLg]: {
            slidesPerView: 4,
          },
        }}
      >
        {Array.from({ length: 6 }).map((item, index) => {
          return (
            <SwiperSlide key={`announce_placeholder_${index}`} className={css.item}>
              <SliderCardSkeleton />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return (
    <Swiper
      className={css.container}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      slidesPerGroup={1}
      slidesPerView="auto"
      allowTouchMove
      breakpoints={{
        [variable.breakpointXs]: {
          slidesPerView: 2,
        },
        [variable.breakpointLg]: {
          slidesPerView: 4,
        },
      }}
    >
      {contents.map(({ isFavorite, ...item }, index) => {
        return (
          <SwiperSlide key={`announce_${index}`} className={css.item}>
            <SliderCard
              content={item}
              channel={channelMap[item.channelId]}
              addAlarm={addAlarm}
              openNewTab={openNewTab}
              addBlock={addBlock}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
