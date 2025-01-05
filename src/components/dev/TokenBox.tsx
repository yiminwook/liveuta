'use client';
import CopyButton from '@/components/common/button/CopyButton';
import { TToken } from '@/types';
import { useTranslations } from 'next-intl';
import css from './Home.module.scss';

export default function TokenBox({ token }: { token: TToken }) {
  const t = useTranslations('dev.tokenBox');
  switch (typeof token) {
    case 'string':
      return (
        <>
          <div className={css.token}>{token}</div>
          <CopyButton value={token!} size={'1.5rem'} />
        </>
      );
    case 'undefined':
      return <div>{t('tokenError')}</div>;
    default:
      return <div>{t('gettingToken')}</div>;
  }
}
