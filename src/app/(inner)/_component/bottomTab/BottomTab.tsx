'use client';
import { BREAK_POINT } from '@/style/var';
import { useMediaQuery } from 'react-responsive';
import BottomInner from './BottomInner';
import * as styles from './bottomTab.css';

export default function BottomTab() {
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAK_POINT.md}px)` });

  return <div className={styles.wrap}>{isMobile && <BottomInner />}</div>;
}
