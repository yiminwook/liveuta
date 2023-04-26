import { ChannelsDataType } from '@/models/youtube/InChannel';
import Image from 'next/image';
import channels from '@/styles/channel/Channel.module.scss';
import { renderSubscribe } from '@/utils/RenderSubscribe';
import Link from 'next/link';
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
      <div className={channels['image-container']} style={{ position: 'relative', width: '88px', height: '88px' }}>
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
      <div className={channels['desc']}>
        <h1>{channelName}</h1>
        <div className={channels['subtitle']}>
          <h2>{snippet.title}</h2>
          <span>{renderSubscribe(subscribe)}</span>
        </div>
        <div>업로드 수: {videoCount}</div>
        <Link href={url}>{url}</Link>
        <button>button</button>
      </div>
    </div>
  );
};

export default ChannelItem;
