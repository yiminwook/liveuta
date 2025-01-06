import character from '@/assets/image/character-1.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import css from './Nodata.module.scss';

export default function Nodata() {
  const t = useTranslations('global.noData');

  return (
    <div className={css.nodataBox}>
      <div className={css.nodataImageBox}>
        <Image className={css.nodataImage} src={character} fill alt={t('imageAlt')} unoptimized />
      </div>
      <h2 className={css.nodataText}>No Data</h2>
    </div>
  );
}
