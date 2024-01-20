import { ImageBox } from '@/components/common/scheduleCard/Style';
import { DEFAULT_BLUR_BASE64 } from '@/consts';
import altImage from '@/images/thumbnail_alt_img.png';
import { ContentsDataType } from '@/types/inSheet';
import { gtagClickAtag } from '@/utils/gtag';
import Image from 'next/image';
import { MouseEvent, useCallback, useRef, useState } from 'react';

interface CardImageProps {
  content: ContentsDataType;
}

const CardImage = ({ content }: CardImageProps) => {
  const { channelName, thumbnailURL, url } = content;

  const [imgLoaded, setImgLoaded] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgValidity = useCallback(() => {
    const currentImage = imgRef.current;
    if (!currentImage) return;
    if (currentImage.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  }, [imgRef]);

  const linkClickEvent = (e: MouseEvent<HTMLAnchorElement>) =>
    gtagClickAtag(e, {
      target: 'scheduleCard',
      action: 'atag',
      content: content.channelName,
      detail: content.title,
    });

  return (
    <ImageBox href={url} onClick={linkClickEvent}>
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
        <Image src={altImage} alt={`${channelName}의 라이브방송`} placeholder="blur" unoptimized fill />
      )}
    </ImageBox>
  );
};

export default CardImage;
