'use client';
import { TContentsData } from '@/types/api/mongoDB';
import variable from '@variable';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCard from '../common/scheduleCard/SliderCard';
import SliderCardPlaceholder from '../common/scheduleCard/SliderCardPlaceholder';
import css from './ScheduleSlider.module.scss';

type ScheduleSliderProps = {
  contents: (TContentsData & { isFavorite: boolean })[];
  isLoading?: boolean;
  addAlarm?: (item: TContentsData) => void;
  openNewTab?: (item: TContentsData) => void;
  addMultiView?: (item: TContentsData) => void;
  toggleFavorite?: (item: TContentsData) => void;
  addBlock?: (item: TContentsData) => void;
};

export default function ScheduleSlider({
  contents,
  addAlarm,
  openNewTab,
  addMultiView,
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
              <SliderCardPlaceholder />
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
      {contents.map((item, index) => {
        return (
          <SwiperSlide key={`announce_${index}`} className={css.item}>
            <SliderCard
              content={item}
              addAlarm={addAlarm}
              openNewTab={openNewTab}
              addMultiView={addMultiView}
              addBlock={addBlock}
              toggleFavorite={toggleFavorite}
              isFavorite={item.isFavorite}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
