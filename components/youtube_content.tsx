import { useState } from 'react';
import { UpcomingData } from '@/models/sheet/in_sheet';
import Link from 'next/link';
import Image from 'next/image';
import youtube_content from '@/styles/youtube_content.module.scss';

interface YoutubeContentProps {
  contents: UpcomingData;
}

const YoutubeContent = ({ contents }: YoutubeContentProps) => {
  const { title, url, channelName, videoId, korTime, iterval } = contents;
  const [imgLoaded, setImgLoaded] = useState(true);
  let thumbnailUrl = contents.thumbnailUrl;
  let thumbnailAlt = `${title}_img`;

  if (thumbnailUrl === 'failed to get' || thumbnailUrl === undefined || thumbnailUrl === null) {
    thumbnailUrl = '/thumbnail_alt_img.jpg';
    thumbnailAlt = `${title}_error_img`;
  }

  return (
    <div className={youtube_content['youtube__container']} key={videoId}>
      <div className={youtube_content['youtube_content__container']}>
        <div className={youtube_content['youtube_thumnail__container']}>
          <Link className={youtube_content['img_link']} href={url ?? ''}>
            {imgLoaded ? (
              <Image
                src={thumbnailUrl}
                alt={thumbnailAlt}
                loading="lazy"
                onError={() => setImgLoaded(false)}
                unoptimized
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image src="/thumbnail_alt_img.jpg" alt={thumbnailAlt} layout="fill" objectFit="cover" unoptimized />
            )}
          </Link>
        </div>
        <div className={youtube_content['youtube_description']}>
          <div className={youtube_content['youtube_channel_name']}>{channelName ?? 'no channel name'}</div>
          <div className={youtube_content['youtube_title']}>{title ?? 'no title'}</div>
          <Link className={youtube_content['youtube_link']} href={url ?? ''}>
            {url ?? 'no url'}
          </Link>
          <div className={youtube_content['youtube_time__container']}>
            <div className={youtube_content['youtube_time__kor']}>{korTime ?? 'no sheduled time'}</div>
            <div className={youtube_content['youtube_time__inter']}>{iterval ? `(${iterval})` : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeContent;
