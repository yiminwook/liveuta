'use client';
import { TContentsData } from '@/types/api/mongoDB';
import variable from '@variable';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCard from '../common/scheduleCard/SliderCard';
import SliderCardPlaceholder from '../common/scheduleCard/SliderCardPlaceholder';
import css from './ScheduleSlider.module.scss';

type ScheduleSliderProps = {
  contents: TContentsData[];
  isLoading?: boolean;
  isFavorite?: boolean;
};

export default function ScheduleSlider({
  contents,
  isLoading,
  isFavorite = false,
}: ScheduleSliderProps) {
  if (isLoading) {
    return (
      <Swiper
        className={css.container}
        slidesPerGroup={1}
        slidesPerView="auto"
        allowTouchMove={false}
        breakpoints={{
          [variable.breakpointXs]: {
            slidesPerView: 2,
          },
          [variable.breakpointLg]: {
            slidesPerView: 4,
          },
        }}
      >
        {new Array(6).fill(null).map((item, index) => {
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
      slidesPerGroup={1}
      slidesPerView="auto"
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
            <SliderCard content={item} isFavorite={isFavorite} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
