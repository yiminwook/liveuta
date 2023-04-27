import { ChannelsDataType } from '@/models/youtube/InChannel';
import Image from 'next/image';
import channels from '@/styles/channels/Channels.module.scss';
import { renderSubscribe } from '@/utils/RenderSubscribe';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import ChannelItemModal from '@/components/channels/ChannelItemModal';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '../common/CopyButton';

interface ChannelItemProps {
  content: ChannelsDataType;
}

const ChannelItem = ({ content }: ChannelItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const { channelName, snippet, url, statistics } = content;
  const title = snippet.title ?? '';
  const imageURL = snippet.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet.description ?? '비공개';
  const subscribe = renderSubscribe(statistics.subscriberCount ?? '비공개');
  const videoCount = statistics.videoCount ?? '비공개';

  const toggleModal = (e: MouseEvent) => {
    console.log('test');
    e.stopPropagation();
    setShowModal((pre) => !pre);
  };

  return (
    <>
      <div className={channels['channel']} onClick={toggleModal}>
        <Link href={url}>
          <div className={channels['image-container']}>
            <Image
              src={imageURL}
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
            <h2>{title}</h2>
            <p className={channels['subscribe']}>구독자 {subscribe}</p>
            <p className={channels['upload-count']}>업로드 수: {videoCount}</p>
            <div className={channels['link']}>
              <button onClick={() => openWindow(url)}>유투브 채널</button>
              <CopyButton value={url} size={'0.8rem'} />
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <ChannelItemModal
          channelName={channelName}
          title={title}
          imageURL={imageURL}
          url={url}
          videoCount={videoCount}
          subscribe={subscribe}
          description={description}
          onClose={toggleModal}
        />
      ) : null}
    </>
  );
};

export default ChannelItem;
