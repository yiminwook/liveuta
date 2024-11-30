'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ScheduleSlider.module.scss';
import ScheduleCard from '../common/scheduleCard/Card';
import { StreamCategory } from '@/types';
import variable from '@variable';

const DUMMY_DATA = [
  {
    title: '梶浦由記Only 初・100曲耐久 Vsinger/Vtuber',
    channelName: '미카구라 스즈메',
    videoId: 'ikdEOxM4YrI',
    channelId: 'UCqsS32C_llpT2ia5S1Oh44A',
    timestamp: 1732939200000,
    korTime: '11월 30일 (토) 오후 01:00',
    isStream: 'TRUE',
    interval: '',
    isVideo: false,
    viewer: '615',
    category: 'default',
    tag: '',
  },
  {
    title: '🔔 We sing n chill 🔔 late smol birthday celebration',
    channelName: '띵커벨라',
    videoId: 'fTgS4jI_clA',
    channelId: 'UCPsbhqweA1dRtyncwzjQfRQ',
    timestamp: 1732948422000,
    korTime: '11월 30일 (토) 오후 03:33',
    isStream: 'TRUE',
    interval: '',
    isVideo: false,
    viewer: '33',
    category: 'default',
    tag: '',
  },
  {
    title: '11月がんばったし、好きに飲んでもいいよね？singing stream',
    channelName: '슈온',
    videoId: 'l4zK80aRevk',
    channelId: 'UCrKmDvrKEkel4R8l4cNR9ow',
    timestamp: 1732964400000,
    korTime: '11월 30일 (토) 오후 08:00',
    isStream: 'TRUE',
    interval: '',
    isVideo: false,
    viewer: '10',
    category: 'default',
    tag: '',
  },
  {
    title: '初見歓迎！懐かしいボカロ多めに歌う！',
    channelName: '시치하치 쿠마노',
    videoId: 'rhTUvnemVpo',
    channelId: 'UC_4x4gCnCkJ2o-VINN0AJ6A',
    timestamp: 1732964549000,
    korTime: '11월 30일 (토) 오후 08:02',
    isStream: 'TRUE',
    interval: '',
    isVideo: false,
    viewer: '45',
    category: 'default',
    tag: '',
  },
  {
    title: '高評価160耐久！！ 1曲聴いていきませんか？☪️🌫️',
    channelName: '시카 유이나 & 아이나',
    videoId: 'K7xJ45VDmqs',
    channelId: 'UCu80GOxLBJOGK3tff56OmxA',
    timestamp: 1732965221000,
    korTime: '11월 30일 (토) 오후 08:13',
    isStream: 'TRUE',
    interval: '',
    isVideo: false,
    viewer: '27',
    category: 'default',
    tag: '',
  },
];

export default function ScheduleSlider() {
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
      {DUMMY_DATA.map((item, index) => {
        return (
          <SwiperSlide key={`announce_${index}`} className={css.item}>
            <ScheduleCard
              session={null}
              content={{ ...item, isStream: 'TRUE', viewer: 0, category: StreamCategory.default }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
