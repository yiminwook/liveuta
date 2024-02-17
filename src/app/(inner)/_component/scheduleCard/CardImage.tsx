'use client';
import { playerAtom } from '@inner/_lib/atom';
import { DEFAULT_BLUR_BASE64 } from '@/const';
import useResponsive from '@/hook/useResponsive';
import altImage from '@/asset/image/thumbnail_alt_img.png';
//import { ContentsDataType } from '@/types/inSheet';
import { ContentsDataType } from '@/type/api/mongoDB';
import { gtagClick } from '@inner/_lib/gtag';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import * as styles from './card.css';

interface CardImageProps {
  content: ContentsDataType;
}

export default function CardImage({ content }: CardImageProps) {
  const { channelName, thumbnailURL, url, videoId } = content;
  const [imgLoaded, setImgLoaded] = useState(true);
  const { isMobile } = useResponsive();
  const setPlayerValue = useSetAtom(playerAtom);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgValidity = useCallback(() => {
    const currentImage = imgRef.current;
    if (!currentImage) return;
    if (currentImage.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  }, [imgRef]);

  const linkClickEvent = (e: MouseEvent<HTMLButtonElement>) => {
    gtagClick({
      target: 'scheduleCard',
      action: 'atag',
      content: content.channelName,
      detail: content.title,
    });

    if (isMobile) {
      window.location.href = url;
    } else {
      setPlayerValue((pre) => ({ ...pre, url, videoId, hide: false }));
    }
  };

  return (
    <button className={styles.imageLink} onClick={linkClickEvent}>
      <div>
        {imgLoaded ? (
          <Image
            src={thumbnailURL ?? altImage}
            alt={`${channelName}의 라이브방송`}
            loading="lazy"
            ref={imgRef}
            onLoad={handleImgValidity}
            onError={() => setImgLoaded(false)}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_BASE64}
            unoptimized
            fill
          />
        ) : (
          <Image
            src={altImage}
            alt={`${channelName}의 라이브방송`}
            placeholder="blur"
            unoptimized
            fill
          />
        )}
      </div>
    </button>
  );
}
