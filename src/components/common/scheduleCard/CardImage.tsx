'use client';
import altImage from '@/assets/image/thumbnail_alt_img.png';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { playerStatusAtom, playerVideoIdAtom } from '@/stores/player';
import { TContentsData } from '@/types/api/mongoDB';
import { gtagClick } from '@/utils/gtag';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

interface CardImageProps {
  content: TContentsData;
}

export default function CardImage({ content }: CardImageProps) {
  const { channelName, videoId } = content;
  const videoUrl = generateVideoUrl(videoId);
  const thumbnailUrl = generateThumbnail(videoId, 'mqdefault');
  const [imgLoaded, setImgLoaded] = useState(true);
  const setPlayerVideoId = useSetAtom(playerVideoIdAtom);
  const setPlayerStatus = useSetAtom(playerStatusAtom);
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
    <button className="imgBtn" onClick={linkClickEvent}>
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
    </button>
  );
}
