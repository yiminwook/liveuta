'use client';
// 서버컴포넌트일때 device-detect가 반영되지않아 클라이언트로 변경
import { TScheduleAPIReturn } from '@/types/api/mongoDB';
import PlayerWrap from '../common/player/PlayerWrap';
import * as styles from './topSection.css';
import { isMobile } from 'react-device-detect';

interface TopSectionProps {
  filter: keyof TScheduleAPIReturn;
}

export default function TopSection({ filter }: TopSectionProps) {
  if (filter !== 'live' || isMobile) return null;
  return (
    <section className={styles.topSection}>
      <PlayerWrap />
    </section>
  );
}
