import Image from 'next/image';
import Modal from '../layout/Modal';
import channelItemModal from '@/styles/channels/ChannelItemModal.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '../common/CopyButton';
import { MouseEvent } from 'react';

interface ChannelItemModalProp {
  onClose: (e: MouseEvent) => void;
  channelName: string;
  title: string;
  imageURL: string;
  url: string;
  videoCount: string;
  subscribe: string;
  description: string;
}

const ChannelItemModal = ({
  title,
  channelName,
  imageURL,
  url,
  videoCount,
  subscribe,
  description,
  onClose,
}: ChannelItemModalProp) => {
  return (
    <Modal onClose={onClose}>
      <div className={channelItemModal['modal']}>
        <div className={channelItemModal['profile']}>
          <div className={channelItemModal['image-container']}>
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
          <div className={channelItemModal['info']}>
            <h1 className={channelItemModal['channel-name']}>{channelName}</h1>
            <h2 className={channelItemModal['title']}>{title}</h2>
            <div className={channelItemModal['detail']}>
              <h3 className={channelItemModal['subscribe']}>구독자 {subscribe}</h3>
              <h3 className={channelItemModal['video-count']}>업로드 수 {videoCount} 개</h3>
            </div>
            <div className={channelItemModal['link']}>
              <button onClick={() => openWindow(url)}>유투브 채널</button>
              <CopyButton value={url} size={'1rem'} />
            </div>
          </div>
        </div>

        <pre className={channelItemModal['desc']}>{description}</pre>
      </div>
    </Modal>
  );
};

export default ChannelItemModal;
