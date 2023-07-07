import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { ContentsDataType } from '@/types/inSheet';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { DEFAULT_BLUR_BASE64 } from '@/consts';
import altImage from '@/images/thumbnail_alt_img.png';

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
    <div className={scheduleCard['thumnail']}>
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
    </div>
  );
};

export default SchduleCardImage;
