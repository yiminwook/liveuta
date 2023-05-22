/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContentsDataType } from '@/types/inSheet';
import Link from 'next/link';
import Image from 'next/image';
import youtubeContentCard from '@/styles/common/YoutubeContentCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/CopyButton';
import { DEFAULT_BLUR_BASE64 } from '@/consts';
import altImage from '@/images/thumbnail_alt_img.png';

interface YoutubeContentCardProps {
  content: ContentsDataType;
  currentIndex: number;
  lastContentsIndex: number;
  handleInfinityScroll?: () => void;
}

const YoutubeContentCard = ({
  content,
  currentIndex,
  lastContentsIndex,
  handleInfinityScroll,
}: YoutubeContentCardProps) => {
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
        streamModifer = youtubeContentCard['closed'];
        break;
      case 'TRUE':
        streamModifer = youtubeContentCard['stream'];
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
    <div className={[youtubeContentCard['card'], addStreamModifier].join(' ')} key={videoId} ref={target}>
      <div className={youtubeContentCard['content']}>
        <Link href={url}>
          <div className={youtubeContentCard['thumnail']}>
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
        <div className={youtubeContentCard['description']}>
          <div className={[youtubeContentCard['channel_name'], addStreamModifier].join(' ')}>{channelName}</div>
          <div className={[youtubeContentCard['title'], addStreamModifier].join(' ')}>{title}</div>
          <div className={youtubeContentCard['time']}>
            <div className={youtubeContentCard['kor']}>{korTime}</div>
            <div className={youtubeContentCard['status']}>{isStream === 'TRUE' ? 'LIVE!' : interval}</div>
          </div>
          <div className={youtubeContentCard['link']}>
            <button onClick={() => openWindow(url)}>새 탭으로 열기</button>
            <CopyButton value={url} size={'0.8rem'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeContentCard;
