import { useRef, useState } from 'react';
import { UpcomingData } from '@/models/sheet/in_sheet';
import Link from 'next/link';
import Image from 'next/image';
import youtubeContent from '@/styles/youtube_content.module.scss';

interface YoutubeContentProps {
  contents: UpcomingData;
}

const YoutubeContent = ({ contents }: YoutubeContentProps) => {
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
    <div className={youtubeContent['youtube__container']} key={videoId}>
      <div className={youtubeContent['youtube_content__container']}>
        <div className={youtubeContent['youtube_thumnail__container']}>
          <Link className={youtubeContent['img_link']} href={url ?? ''}>
            {imgLoaded ? (
              <Image
                src={thumbnailUrl}
                alt={thumbnailAlt}
                loading="lazy"
                ref={imgRef}
                onLoad={handleImgValidity}
                onError={() => setImgLoaded(false)}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMiCuoBwAEIwG3Vpkr7gAAAABJRU5ErkJggg=="
                unoptimized
                fill
              />
            ) : (
              <Image src="/thumbnail_alt_img.png" alt={thumbnailAlt} unoptimized fill />
            )}
          </Link>
        </div>
        <div className={youtubeContent['youtube_description']}>
          <div className={youtubeContent['youtube_channel_name']}>{channelName ?? 'no channel name'}</div>
          <div className={youtubeContent['youtube_title']}>{title ?? 'no title'}</div>
          <Link className={youtubeContent['youtube_link']} href={url ?? ''}>
            {url ?? 'no url'}
          </Link>
          <div className={youtubeContent['youtube_time__container']}>
            <div className={youtubeContent['youtube_time__kor']}>{korTime ?? 'no sheduled time'}</div>
            <div className={youtubeContent['youtube_time__inter']}>{iterval ? `(${iterval})` : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeContent;
