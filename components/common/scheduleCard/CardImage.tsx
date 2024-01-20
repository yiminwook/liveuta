import { ContentsDataType } from '@/types/inSheet';
import Image from 'next/image';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { DEFAULT_BLUR_BASE64 } from '@/consts';
import altImage from '@/images/thumbnail_alt_img.png';
import styled from '@emotion/styled';
import { gtagClickAtag } from '@/utils/gtag';
import { WIDTH } from '@/styles/var';

const ImageBox = styled.a`
  position: relative;
  box-sizing: border-box;
  margin: auto;
  width: 12rem;
  aspect-ratio: 16 / 9;
  border-radius: 5px;
  height: 100%;
  overflow: hidden;
  background-color: #fff;

  & > img {
    object-fit: cover;
  }

  @media (min-width: ${WIDTH.SM}) {
    width: 100%;
    flex-basis: 200%;
  }
`;

interface ScheduleCardImageProps {
  content: ContentsDataType;
}

const SchduleCardImage = ({ content }: ScheduleCardImageProps) => {
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

export default SchduleCardImage;
