'use client';
import altImage from '@/asset/image/thumbnail_alt_img.png';
import { DEFAULT_BLUR_BASE64 } from '@/const';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import { generateVideoUrl } from '@/model/youtube/url';
import { ContentsDataType } from '@/type/api/mongoDB';
import { player } from '@inner/_lib/atom';
import { gtagClick } from '@inner/_lib/gtag';
import Image from 'next/image';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import * as styles from './card.css';
import { useSetAtom } from 'jotai';
import { useMediaQuery } from 'react-responsive';

interface CardImageProps {
  content: ContentsDataType;
}

export default function CardImage({ content }: CardImageProps) {
  const { channelName, videoId } = content;
  const videoUrl = generateVideoUrl(videoId);
  const thumbnailUrl = generateThumbnail(videoId, 'mqdefault');
  const [imgLoaded, setImgLoaded] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const setPlayerVideoId = useSetAtom(player.playerVideoIdAtom);
  const setPlayerStatus = useSetAtom(player.playerStatusAtom);
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
      window.location.href = videoUrl;
    } else {
      setPlayerVideoId(() => videoId);
      setPlayerStatus((pre) => ({ ...pre, timeline: 0, hide: false, isPlaying: true }));
    }
  };

  return (
    <button className={styles.imageLink} onClick={linkClickEvent}>
      <div>
        {imgLoaded ? (
          <Image
            src={thumbnailUrl ?? altImage}
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
