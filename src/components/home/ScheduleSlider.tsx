'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ScheduleSlider.module.scss';
import ScheduleCard from '../common/scheduleCard/Card';
import { StreamCategory } from '@/types';

const DUMMY_DATA = new Array(20).fill(null);

export default function ScheduleSlider() {
  return (
    <Swiper
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      slidesPerView="auto"
      slidesPerGroup={1}
      width={500}
      spaceBetween={7}
      breakpoints={{
        600: {
          spaceBetween: 0,
        },
      }}
    >
      {DUMMY_DATA.map((_, index) => {
        return (
          <SwiperSlide key={`announce_${index}`} className={css.item}>
            <ScheduleCard
              session={null}
              content={{
                title: 'string',
                channelName: 'string',
                videoId: 'string',
                channelId: 'string',
                timestamp: 0,
                isStream: 'TRUE',
                korTime: 'string',
                interval: 'string',
                isVideo: false,
                viewer: 100,
                category: StreamCategory.default,
                tag: 'string',
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
