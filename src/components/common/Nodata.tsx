import character from '@/assets/image/character-1.png';
import Image from 'next/image';
import css from './Nodata.module.scss';

export default function Nodata() {
  return (
    <div className={css.nodataBox}>
      <div className={css.nodataImageBox}>
        <Image
          className={css.nodataImage}
          src={character}
          fill
          alt="조회된 페이지가 없습니다."
          unoptimized
        />
      </div>
      <h2 className={css.nodataText}>No Data</h2>
    </div>
  );
}
