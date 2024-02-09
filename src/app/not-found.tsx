import Link from 'next/link';
import type { Metadata } from 'next';
import { FcFinePrint } from 'react-icons/fc';
import styles from '@/style/not-found.css';

export const metadata: Metadata = {
  title: '404: Not Found',
};

export default async function NotFound() {
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
          <Link className={styles.link} href="/">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
