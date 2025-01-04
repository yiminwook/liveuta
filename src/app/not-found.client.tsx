'use client';
import character from '@/assets/image/character-8.png';
import { redirect } from '@/i18n/routing';
import Image from 'next/image';
import Link from 'next/link';
import css from './not-found.module.scss';

type ClientProps = {
  locale: string;
};

export default function Client({ locale }: ClientProps) {
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
            <button onClick={() => redirect({ href: '/', locale })}>홈페이지로 이동</button>
          </div>
        </div>
      </div>
    </div>
  );
}
