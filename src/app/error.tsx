// https://nextjs.org/docs/app/building-your-application/routing/error-handling
//에러 페이지는 클라이언트에서만 렌더링되어야 합니다.
'use client';
import character from '@/assets/image/character-6.png';
import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';
import css from './not-found.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; //세그먼트를 다시 렌더링하여 복구 시도
}) {
  const t = useTranslations('error.error');

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className={css.wrap}>
      <div className={css.box}>
        <Image alt={t('imageAlt')} src={character} width={200} height={300} unoptimized={true} />
        <div className={css.desc}>
          <div className={css.descTop}>
            <h1>{t('title')}</h1>
            <h2>{error.message}</h2>
          </div>
          <div className={css.descBottom}>
            <button onClick={reset}>{t('retry')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
