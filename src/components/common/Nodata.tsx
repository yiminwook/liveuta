import character from '@/assets/image/character-1.png';
import { useTranslations } from '@/libraries/i18n/client';
import Image from 'next/image';
import css from './Nodata.module.scss';

export default function Nodata() {
  const { t } = useTranslations();

  return (
    <div className={css.nodataBox}>
      <div className={css.nodataImageBox}>
        <Image
          className={css.nodataImage}
          src={character}
          fill
          alt={t('global.noData.imageAlt')}
          unoptimized
        />
      </div>
      <h2 className={css.nodataText}>No Data</h2>
    </div>
  );
}
