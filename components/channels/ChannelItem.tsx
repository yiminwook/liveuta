import { ChannelsDataType } from '@/models/youtube/InChannel';
import Image from 'next/image';
import channels from '@/styles/channels/Channels.module.scss';
import { renderSubscribe } from '@/utils/RenderSubscribe';
import Link from 'next/link';
import { BiSearchAlt } from 'react-icons/bi';

interface ChannelItemProps {
  content: ChannelsDataType;
}

const ChannelItem = ({ content }: ChannelItemProps) => {
  const { channelName, snippet, url, statistics } = content;
  const profileImage = snippet.thumbnails?.default?.url ?? '/loading.png';
  const subscribe = statistics.subscriberCount ?? '비공개';
  const videoCount = statistics.videoCount ?? '비공개';
  // const desc = snippet.description;

  return (
    <div className={channels['channel']}>
      <Link href={url}>
        <div className={channels['image-container']}>
          <Image
            src={profileImage}
            alt=""
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8U9hfDwAGKgJNP3RWxQAAAABJRU5ErkJggg=="
            fill
            unoptimized
          />
        </div>
      </Link>
      <div className={channels['desc']}>
        <h1>{channelName}</h1>
        <div className={channels['details']}>
          <h2>{snippet.title}</h2>
          <p className={channels['subscribe']}>{'구독자 ' + renderSubscribe(subscribe)}</p>
          <p className={channels['upload-count']}>업로드 수: {videoCount}</p>
          <Link href={url}>유투브 페이지로 이동</Link>
        </div>
        <button>
          <BiSearchAlt color={'inherit'} size={'2rem'} />
        </button>
      </div>
    </div>
  );
};

export default ChannelItem;
