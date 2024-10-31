import Image from 'next/image';
import character from '@/assets/image/character-1.png';
import * as styles from './nodata.css';

export default function Nodata() {
  return (
    <div className={styles.nodataBox}>
      <div className={styles.nodataImageBox}>
        <Image
          className={styles.nodataImage}
          src={character}
          fill
          alt="조회된 페이지가 없습니다."
          unoptimized
        />
      </div>
      <h2 className={styles.nodataText}>No Data</h2>
    </div>
  );
}
