'use client';
import Image from 'next/image';
import { AiOutlineLoading } from 'react-icons/ai';
import loadingImage from '/public/loading.png';
import { RemoveScroll } from 'react-remove-scroll';
import * as styles from '@/components/common/loading/loading.css';
import cx from 'classnames';
import Backdrop from '../Backdrop';

type MainLoadingProps = {
  backdrop: boolean;
};
export default function MainLoading({ backdrop }: MainLoadingProps) {
  return (
    <RemoveScroll>
      {backdrop && <Backdrop activeParticles={true} />}
      <div className={cx(styles.MainLoadingWrap)}>
        <div>
          <div className={styles.MainLoadingInner}>
            <Image
              src={loadingImage}
              width={100}
              height={100}
              alt="loading_img"
              unoptimized
              priority
            />
            <AiOutlineLoading className={styles.MainLoadingBar} size={130} color="inherit" />
          </div>
          <p className={styles.MainLoadingText}>Loading Now!</p>
        </div>
      </div>
    </RemoveScroll>
  );
}
