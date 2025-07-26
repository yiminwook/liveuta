import Image from 'next/image';
import loadingImage from '/public/assets/character-13.png';
import css from './GlobalLoading.module.scss';

export default function GlobalLoading() {
  return (
    <div className={css.wrap}>
      <div>
        <div className={css.inner}>
          <Image
            className={css.image}
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
