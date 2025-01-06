'use client';
import character from '@/assets/image/character-8.png';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import css from './not-found.module.scss';

export default function Client() {
  const t = useTranslations('error.notFound');
  const router = useRouter();

  return (
    <div className={css.wrap}>
      <div className={css.box}>
        <Image src={character} alt={t('imageAlt')} width={200} height={300} unoptimized={true} />
        <div className={css.desc}>
          <div className={css.descTop}>
            <h1>{t('title')}</h1>
          </div>
          <div className={css.descBottom}>
            <button onClick={() => router.back()}>{t('goBack')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
