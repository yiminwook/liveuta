'use client';
import { TChannelDocumentWithoutId, TParsedClientContent } from '@/libraries/mongodb/type';
import variable from '@variable';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCard from '../common/scheduleCard/SliderCard';
import SliderCardSkeleton from '../common/scheduleCard/SliderCardSkeleton';
import css from './ScheduleSlider.module.scss';

type ScheduleSliderProps = {
  contents: (TParsedClientContent & { isFavorite: boolean })[];
  channelMap: Record<string, TChannelDocumentWithoutId>;
  isLoading?: boolean;
  addAlarm?: (item: TParsedClientContent, channel: TChannelDocumentWithoutId | undefined) => void;
  openNewTab?: (item: TParsedClientContent) => void;
  toggleFavorite?: (item: TParsedClientContent) => void;
  addBlock?: (item: TParsedClientContent) => void;
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
