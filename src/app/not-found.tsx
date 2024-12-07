'use client';
import type { Metadata } from 'next';
import character from '@/assets/image/character-8.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './not-found.module.scss';

export const metadata: Metadata = {
  title: '404: Not Found',
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={css.wrap}>
      <div className={css.box}>
        <Image
          src={character}
          alt="페이지를 찾을 수 없습니다."
          width={200}
          height={300}
          unoptimized={true}
        />
        <div className={css.desc}>
          <div className={css.descTop}>
            <h1>404: Not Found</h1>
            <h2>페이지를 찾을 수 없습니다.</h2>
          </div>
          <div className={css.descBottom}>
            <button onClick={() => router.back()}>뒤로가기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
