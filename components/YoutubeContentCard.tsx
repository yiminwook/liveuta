import { useRef, useState } from 'react';
import { ContentsDataType } from '@/models/sheet/Insheet';
import Link from 'next/link';
import Image from 'next/image';
import youtubeContentCard from '@/styles/YoutubeContentCard.module.scss';

interface YoutubeContentCardProps {
  contents: ContentsDataType;
}

const YoutubeContentCard = ({ contents }: YoutubeContentCardProps) => {
  const { title, url, channelName, videoId, korTime, interval, isLive } = contents;
  const [imgLoaded, setImgLoaded] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgValidity = () => {
    if (!imgRef.current) return;
    if (imgRef.current.naturalHeight === 90) {
      setImgLoaded(() => false);
    }
  };

  let thumbnailURL = contents.thumbnailURL;
  let thumbnailAlt = `${title}_img`;

  if (thumbnailURL === 'failed to get' || thumbnailURL === undefined || thumbnailURL === null) {
    thumbnailURL = '/thumbnail_alt_img.png';
    thumbnailAlt = `${title}_error_img`;
  }

  return (
    <div className={[youtubeContentCard['card'], isLive ? youtubeContentCard['live'] : ''].join(' ')} key={videoId}>
      <div className={youtubeContentCard['content']}>
        <div className={youtubeContentCard['thumnail']}>
          <Link href={url}>
            {imgLoaded ? (
              <Image
                src={thumbnailURL}
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
        <div className={youtubeContentCard['description']}>
          <div className={[youtubeContentCard['channel_name'], isLive ? youtubeContentCard['live'] : ''].join(' ')}>
            {channelName}
          </div>
          <div className={[youtubeContentCard['title'], isLive ? youtubeContentCard['live'] : ''].join(' ')}>
            {title}
          </div>
          <Link className={youtubeContentCard['link']} href={url}>
            {url}
          </Link>
          <div className={youtubeContentCard['time']}>
            <div className={youtubeContentCard['kor']}>{korTime}</div>
            <div className={youtubeContentCard['status']}>{isLive ? 'LIVE!' : interval}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeContentCard;
