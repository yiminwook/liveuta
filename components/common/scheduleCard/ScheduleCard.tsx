/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContentsDataType } from '@/types/inSheet';
import Link from 'next/link';
import Image from 'next/image';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/CopyButton';
import { DEFAULT_BLUR_BASE64 } from '@/consts';
import altImage from '@/images/thumbnail_alt_img.png';

interface ScheduleCardProps {
  content: ContentsDataType;
  currentIndex: number;
  lastContentsIndex: number;
  handleInfinityScroll?: () => void;
}

const ScheduleCard = ({ content, currentIndex, lastContentsIndex, handleInfinityScroll }: ScheduleCardProps) => {
  const { title, url, channelName, videoId, korTime, interval, isStream, thumbnailURL } = content;
  const [imgLoaded, setImgLoaded] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const target = useRef<HTMLDivElement>(null);

  const handleImgValidity = useCallback(() => {
    const currentImage = imgRef.current;
    if (!currentImage) return;
    if (currentImage.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  }, [imgRef]);

  const addStreamModifier = useMemo(() => {
    let streamModifer: string;

    switch (isStream) {
      case 'FALSE':
        streamModifer = scheduleCard['closed'];
        break;
      case 'TRUE':
        streamModifer = scheduleCard['stream'];
        break;
      case 'NULL':
        streamModifer = '';
        break;
      default:
        streamModifer = '';
    }

    return streamModifer;
  }, []);

  const onIntersect: IntersectionObserverCallback = useCallback(
    (items, observer) => {
      if (!handleInfinityScroll) return;
      const currentTarget = target.current;
      const isIntersecting = items[0].isIntersecting;
      if (!(currentTarget && isIntersecting && currentIndex === lastContentsIndex)) return;
      //마지막 요소가 관찰될때만
      handleInfinityScroll();
      observer.unobserve(currentTarget);
    },
    [target, lastContentsIndex],
  );

  useEffect(() => {
    if (!handleInfinityScroll) return;
    const currentTarget = target.current;
    if (!(currentTarget && currentIndex === lastContentsIndex)) return;
    //마지막 요소만 관찰
    const observer = new IntersectionObserver(onIntersect, { rootMargin: '100%' });
    observer.observe(currentTarget);

    return () => observer.disconnect();
  }, [target, content, lastContentsIndex]);

  return (
    <div className={[scheduleCard['card'], addStreamModifier].join(' ')} key={videoId} ref={target}>
      <div className={scheduleCard['content']}>
        <Link href={url}>
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
        </Link>
        <div className={scheduleCard['description']}>
          <div className={[scheduleCard['channel_name'], addStreamModifier].join(' ')}>{channelName}</div>
          <div className={[scheduleCard['title'], addStreamModifier].join(' ')}>{title}</div>
          <div className={scheduleCard['time']}>
            <time className={scheduleCard['kor']}>{korTime}</time>
            <div className={scheduleCard['status']}>{isStream === 'TRUE' ? 'LIVE!' : interval}</div>
          </div>
          <div className={scheduleCard['link']}>
            <button onClick={() => openWindow(url)}>새 탭으로 열기</button>
            <CopyButton value={url} size={'0.8rem'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
