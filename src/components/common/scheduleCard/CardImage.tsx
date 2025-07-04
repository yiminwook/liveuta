'use client';
import altImage from '@/assets/image/thumbnail_alt_img.png';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import { useTranslations } from '@/libraries/i18n/client';
import { TParsedClientContent } from '@/libraries/mongodb/type';
import { generateThumbnail } from '@/libraries/youtube/url';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { usePlayer } from '@/stores/player';
import { gtagClick } from '@/utils/gtag';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

interface CardImageProps {
  content: TParsedClientContent;
}

export default function CardImage({ content }: CardImageProps) {
  const videoUrl = generateVideoUrl(content.videoId);
  const thumbnailUrl = generateThumbnail(content.videoId, 'mqdefault');
  const [imgLoaded, setImgLoaded] = useState(true);
  const actions = usePlayer((state) => state.actions);
  const imgRef = useRef<HTMLImageElement>(null);
  const { t } = useTranslations();

  const handleImgValidity = useCallback(() => {
    const currentImage = imgRef.current;
    if (!currentImage) return;
    if (currentImage.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  }, [imgRef]);

  const linkClickEvent = () => {
    gtagClick({
      target: 'scheduleCard',
      action: 'atag',
      content: content.channelId,
      detail: content.title,
    });

    if (isMobile) {
      window.location.href = videoUrl;
    } else {
      actions.setVideo(content.videoId);
    }
  };

  return (
    <button className="imgBtn" onClick={linkClickEvent}>
      {imgLoaded ? (
        <Image
          src={thumbnailUrl ?? altImage}
          alt={t('schedule.scheduleCard.thumbnail')}
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
          alt={t('schedule.scheduleCard.thumbnail')}
          placeholder="blur"
          unoptimized
          fill
        />
      )}
    </button>
  );
}
