'use client';
import character from '@/assets/image/character-8.png';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import css from './not-found.module.scss';

type Props = {
  locale: TLocaleCode;
};

export default function Client({ locale }: Props) {
  const { t } = useTranslations(locale);
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
