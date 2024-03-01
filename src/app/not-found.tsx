'use client';
import type { Metadata } from 'next';
import { FcFinePrint } from 'react-icons/fc';
import styles from '@/style/not-found.css';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: '404: Not Found',
};

export default function NotFound() {
  const router = useRouter();
  return (
    <div className={styles.wrap}>
      <div>
        <FcFinePrint size={200} />
      </div>
      <div className={styles.inner}>
        <div className={styles.innerTop}>
          <h1>404</h1>
          <h2>페이지를 찾을 수 없습니다.</h2>
        </div>
        <div className={styles.innerBottom}>
          <button onClick={() => router.back()}>뒤로 가기</button>
        </div>
      </div>
    </div>
  );
}
