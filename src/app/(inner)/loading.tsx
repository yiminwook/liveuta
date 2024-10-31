'use client';
import * as styles from '@/components/common/loading/loading.css';
import Wave from '@/components/common/loading/Wave';

export default function Loading() {
  return (
    <div className={styles.loadingWrap}>
      <Wave />
    </div>
  );
}
