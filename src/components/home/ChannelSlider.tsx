'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ChannelSlider.module.scss';

const DUMMY_DATA = new Array(20).fill(null);

export default function ChannelSlider() {
  return (
    <div className={css.wrap}>
      <Swiper
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        slidesPerGroup={1}
        slidesPerView={'auto'}
        centeredSlides={false}
        spaceBetween={7}
      >
        {DUMMY_DATA.map((_, index) => {
          return (
            <SwiperSlide key={`announce_${index}`} style={{ width: '50px' }}>
              <div className={css.item}>
                <div className={css.imageBox}></div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
