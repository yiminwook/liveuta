'use client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { StreamFilter } from '@/types';
import dynamic from 'next/dynamic';
// 서버컴포넌트일때 device-detect가 반영되지않아 클라이언트로 변경
import { isMobile } from 'react-device-detect';
import css from './TopSection.module.scss';

const LiveChatPlayer = dynamic(() => import('../common/player/LiveChatPlayer'), {
  ssr: false,
});

interface TopSectionProps {
  filter: StreamFilter;
  locale: TLocaleCode;
}

export default function TopSection({ filter, locale }: TopSectionProps) {
  if (filter !== StreamFilter.live || isMobile) return null;
  return (
    <section className={css.topSection}>
      <LiveChatPlayer locale={locale} />
    </section>
  );
}
