/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useRef, useState } from 'react';
import { ContentsDataType } from '@/models/sheet/InSheet';
import Link from 'next/link';
import Image from 'next/image';
import youtubeContentCard from '@/styles/common/YoutubeContentCard.module.scss';
import { clipText, openWindow } from '@/utils/windowEvent';

interface YoutubeContentCardProps {
  contents: ContentsDataType;
}

const YoutubeContentCard = ({ contents }: YoutubeContentCardProps) => {
  const { title, url, channelName, videoId, korTime, interval, isStream } = contents;
  const [imgLoaded, setImgLoaded] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgValidity = () => {
    if (!imgRef.current) return;
    if (imgRef.current.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  };

  const thumbnail = useMemo(() => {
    let thumbnailURL = contents.thumbnailURL;
    let thumbnailAlt = `${title}_img`;

    if (thumbnailURL === 'failed to get' || thumbnailURL === undefined || thumbnailURL === null) {
      thumbnailURL = '/thumbnail_alt_img.png';
      thumbnailAlt = `${title}_error_img`;
    }
    return { thumbnailURL, thumbnailAlt };
  }, []);

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

  return (
    <div className={[youtubeContentCard['card'], addStreamModifier].join(' ')} key={videoId}>
      <div className={youtubeContentCard['content']}>
        <div className={youtubeContentCard['thumnail']}>
          <Link href={url}>
            {imgLoaded ? (
              <Image
                src={thumbnail.thumbnailURL}
                alt={thumbnail.thumbnailAlt}
                loading="lazy"
                ref={imgRef}
                onLoad={handleImgValidity}
                onError={() => setImgLoaded(false)}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8U9hfDwAGKgJNP3RWxQAAAABJRU5ErkJggg=="
                unoptimized
                fill
              />
            ) : (
              <Image src="/thumbnail_alt_img.png" alt={thumbnail.thumbnailAlt} unoptimized fill />
            )}
          </Link>
        </div>
        <div className={youtubeContentCard['description']}>
          <div className={[youtubeContentCard['channel_name'], addStreamModifier].join(' ')}>{channelName}</div>
          <div className={[youtubeContentCard['title'], addStreamModifier].join(' ')}>{title}</div>
          <div className={youtubeContentCard['time']}>
            <div className={youtubeContentCard['kor']}>{korTime}</div>
            <div className={youtubeContentCard['status']}>{isStream === 'TRUE' ? 'LIVE!' : interval}</div>
          </div>
          <div className={youtubeContentCard['link']}>
            <button onClick={() => openWindow(url)}>새 탭으로 열기</button>
            <button onClick={() => clipText(url)}>복사</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeContentCard;
