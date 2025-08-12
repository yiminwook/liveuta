'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { useRouter } from '@bprogress/next';
import Image from 'next/image';
import character from '/public/assets/character-8.png';
import css from './not-found.module.scss';

type Props = {};

export default function Client({}: Props) {
  const { t } = useTranslations();
  const router = useRouter();

  return (
    <div className={css.wrap}>
      <div className={css.box}>
        <Image
          src={character}
          alt={t('error.notFound.imageAlt')}
          width={200}
          height={300}
          unoptimized={true}
        />
        <div className={css.desc}>
          <div className={css.descTop}>
            <h1>{t('error.notFound.title')}</h1>
          </div>
          <div className={css.descBottom}>
            <button onClick={() => router.back()}>{t('error.notFound.goBack')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
