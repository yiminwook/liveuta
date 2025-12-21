import Image from 'next/image';
import { useTranslations } from '@/libraries/i18n/client';
import character from '/public/assets/character-1.png';
import css from './Nodata.module.scss';

type Props = {};

export default function Nodata({}: Props) {
  const { t } = useTranslations();

  return (
    <div className={css.nodataBox}>
      <div className={css.nodataImageBox}>
        <Image className={css.nodataImage} src={character} fill alt={t('error.0000')} unoptimized />
      </div>
      <h2 className={css.nodataText}>{t('error.0000')}</h2>
    </div>
  );
}
