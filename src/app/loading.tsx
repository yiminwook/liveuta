'use client';
import Image from 'next/image';
import loading from '@inner/_component/loading/loading.module.scss';
import { AiOutlineLoading } from 'react-icons/ai';
import loadingImage from '/public/loading.png';
import { RemoveScroll } from 'react-remove-scroll';

export default function GlobalLoading() {
  return (
    <RemoveScroll>
      <div className={loading['loading']}>
        <div>
          <div>
            <Image
              src={loadingImage}
              width={100}
              height={100}
              alt="loading_img"
              unoptimized
              priority
            />
            <AiOutlineLoading size={130} color="inherit" />
          </div>
          <p>Loading Now!</p>
        </div>
      </div>
    </RemoveScroll>
  );
}
