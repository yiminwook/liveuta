import loadingImage from '@/assets/image/character-13.png';
import cx from 'classnames';
import Image from 'next/image';
import * as styles from './globalLoading.css';

export default function GlobalLoading() {
  return (
    <div className={cx(styles.wrap)}>
      <div>
        <div className={styles.inner}>
          <Image
            className={styles.image}
            src={loadingImage}
            alt="loading_img"
            fill
            unoptimized={false}
            priority
          />
        </div>
      </div>
    </div>
  );
}
