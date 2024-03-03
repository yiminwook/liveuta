'use client';
import * as styles from './_component/loading/loading.css';
import Wave from './_component/loading/Wave';

export default function Loading() {
  return (
    <div className={styles.loadingWrap}>
      <Wave />
    </div>
  );
}
