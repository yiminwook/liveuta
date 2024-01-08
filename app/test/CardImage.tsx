import { ContentsDataType } from '@/types/inSheet';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { DEFAULT_BLUR_BASE64 } from '@/consts';
import altImage from '@/images/thumbnail_alt_img.png';
import styled from '@emotion/styled';

const ImageBox = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: auto;
  width: 7rem;
  aspect-ratio: 16 / 9;
  border-radius: 5px;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  /* @include transition(scale, 0.3s, linear); */
  /* @include box-shadow(); */

  img {
    padding: 0.2rem;
    object-fit: cover;
  }

  @media (min-width: 640px) {
    width: 100%;
  }
`;

interface ScheduleCardImageProps {
  content: ContentsDataType;
}

const SchduleCardImage = ({ content }: ScheduleCardImageProps) => {
  const { channelName, thumbnailURL } = content;

  const [imgLoaded, setImgLoaded] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgValidity = useCallback(() => {
    const currentImage = imgRef.current;
    if (!currentImage) return;
    if (currentImage.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  }, [imgRef]);

  return (
    <ImageBox>
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
