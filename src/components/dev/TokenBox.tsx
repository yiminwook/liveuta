'use client';
import CopyButton from '@/components/common/button/CopyButton';
import { useTranslations } from '@/libraries/i18n/client';
import { TToken } from '@/types';
import css from './Home.module.scss';

export default function TokenBox({ token }: { token: TToken }) {
  const { t } = useTranslations();

  switch (typeof token) {
    case 'string':
      return (
        <>
          <div className={css.token}>{token}</div>
          <CopyButton value={token!} size={'1.5rem'} />
        </>
      );
    case 'undefined':
      return <div>{t('dev.tokenBox.tokenError')}</div>;
    default:
      return <div>{t('dev.tokenBox.gettingToken')}</div>;
  }
}
