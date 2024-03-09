'use client';
import '@/style/reset.css';
import '/public/theme.css';
import '@/style/global.scss';
import '@/style/global.css';
import '@/style/globalTheme.css';
import type { Metadata } from 'next';
import character from '/src/asset/image/character-8.png';
import * as styles from '@/style/not-found.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '404: Not Found',
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.imgBox}>
          <Image
            src={character}
            alt="페이지를 찾을 수 없습니다."
            width={200}
            height={300}
            unoptimized={true}
          />
        </div>
        <div className={styles.desc}>
          <div className={styles.descTop}>
            <h1>404: Not Found</h1>
            <h2>페이지를 찾을 수 없습니다.</h2>
          </div>
          <div className={styles.descBottom}>
            <button className={styles.button} onClick={() => router.back()}>
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
