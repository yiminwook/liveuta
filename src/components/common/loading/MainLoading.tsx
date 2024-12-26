'use client';
import classnames from 'classnames';
import Image from 'next/image';
import { RemoveScroll } from 'react-remove-scroll';
import loadingImage from '/public/loading.png';
import Backdrop from '../background/Backdrop';
import css from './Loading.module.scss';

type MainLoadingProps = {
  backdrop: boolean;
};

export default function MainLoading({ backdrop }: MainLoadingProps) {
  return (
    <RemoveScroll>
      {backdrop && <Backdrop activeParticles={true} />}
      <div className={classnames(css.mainLoadingWrap)}>
        <div>
          <div className={css.MainLoadingInner}>
            <Image
              src={loadingImage}
              width={100}
              height={100}
              alt="loading_img"
              unoptimized
              priority
            />
            <IconSpinner180Ring className={css.mainLoadingBar} size={130} color="inherit" />
          </div>
          <p className={css.mainLoadingText}>Loading Now!</p>
        </div>
      </div>
    </RemoveScroll>
  );
}
