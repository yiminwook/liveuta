'use client';
import Image from 'next/image';
import { AiOutlineLoading } from 'react-icons/ai';
import loadingImage from '/public/loading.png';
import { RemoveScroll } from 'react-remove-scroll';
import * as styles from '@inner/_component/loading/loading.css';
import cx from 'classnames';

type MainLoadingProps = {
  backdrop: boolean;
};
export default function MainLoading({ backdrop }: MainLoadingProps) {
  return (
    <RemoveScroll>
      <div className={cx(styles.GlobalLoadingWrap, backdrop && 'backdrop')}>
        <div>
          <div className={styles.GlobalLoadingInner}>
            <Image
              src={loadingImage}
              width={100}
              height={100}
              alt="loading_img"
              unoptimized
              priority
            />
            <AiOutlineLoading className={styles.GlobalLoadingBar} size={130} color="inherit" />
          </div>
          <p className={styles.GlobalLoadingText}>Loading Now!</p>
        </div>
      </div>
    </RemoveScroll>
  );
}
