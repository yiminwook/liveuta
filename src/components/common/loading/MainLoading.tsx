'use client';
import Spinner180Ring from '@/icons/svg-spinners-180-ring.svg?react';
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
            <Spinner180Ring
              className={css.mainLoadingBar}
              width={130}
              height={130}
              color="inherit"
            />
          </div>
          <p className={css.mainLoadingText}>Loading Now!</p>
        </div>
      </div>
    </RemoveScroll>
  );
}
