'use client';
// 서버컴포넌트일때 device-detect가 반영되지않아 클라이언트로 변경
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import PlayerWrap from './player/PlayerWrap';
import * as styles from './topSection.css';
import { isMobile } from 'react-device-detect';

interface TopSectionProps {
  filter: keyof ScheduleAPIReturntype;
}

export default function TopSection({ filter }: TopSectionProps) {
  if (filter !== 'live' || isMobile) return null;
  return (
    <section className={styles.topSection}>
      <PlayerWrap />
    </section>
  );
}
