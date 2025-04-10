'use client';
// 서버컴포넌트일때 device-detect가 반영되지않아 클라이언트로 변경
import { TScheduleAPIReturn } from '@/types/api/mongoDB';
import dynamic from 'next/dynamic';
import { isMobile } from 'react-device-detect';
import css from './TopSection.module.scss';

const LiveChatPlayer = dynamic(() => import('../common/player/LiveChatPlayer'), {
  ssr: false,
});

interface TopSectionProps {
  filter: keyof TScheduleAPIReturn;
}

export default function TopSection({ filter }: TopSectionProps) {
  if (filter !== 'live' || isMobile) return null;
  return (
    <section className={css.topSection}>
      <LiveChatPlayer />
    </section>
  );
}
