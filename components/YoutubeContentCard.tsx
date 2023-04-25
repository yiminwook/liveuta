import { useRef, useState } from 'react';
import { UpcomingData } from '@/models/sheet/Insheet';
import Link from 'next/link';
import Image from 'next/image';
import youtubeContentCard from '@/styles/YoutubeContentCard.module.scss';

interface YoutubeContentCardProps {
  contents: UpcomingData;
}

const YoutubeContentCard = ({ contents }: YoutubeContentCardProps) => {
  const { title, url, channelName, videoId, korTime, iterval } = contents;
  const [imgLoaded, setImgLoaded] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgValidity = () => {
    if (!imgRef.current) return;
    if (imgRef.current.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  };

  let thumbnailUrl = contents.thumbnailUrl;
  let thumbnailAlt = `${title}_img`;

  if (thumbnailUrl === 'failed to get' || thumbnailUrl === undefined || thumbnailUrl === null) {
    thumbnailUrl = '/thumbnail_alt_img.png';
    thumbnailAlt = `${title}_error_img`;
  }

  return (
    <div className={youtubeContentCard['youtube__container']} key={videoId}>
      <div className={youtubeContentCard['youtube_content__container']}>
        <div className={youtubeContentCard['youtube_thumnail__container']}>
          <Link className={youtubeContentCard['img_link']} href={url ?? ''}>
            {imgLoaded ? (
              <Image
                src={thumbnailUrl}
                alt={thumbnailAlt}
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
              <Image src="/thumbnail_alt_img.png" alt={thumbnailAlt} unoptimized fill />
            )}
          </Link>
        </div>
        <div className={youtubeContentCard['youtube_description']}>
          <div className={youtubeContentCard['youtube_channel_name']}>{channelName ?? 'no channel name'}</div>
          <div className={youtubeContentCard['youtube_title']}>{title ?? 'no title'}</div>
          <Link className={youtubeContentCard['youtube_link']} href={url ?? ''}>
            {url ?? 'no url'}
          </Link>
          <div className={youtubeContentCard['youtube_time__container']}>
            <div className={youtubeContentCard['youtube_time__kor']}>{korTime ?? 'no sheduled time'}</div>
            <div className={youtubeContentCard['youtube_time__inter']}>{iterval ? `(${iterval})` : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeContentCard;
