import Image from 'next/image';
import Link from 'next/link';
import Modal from '../layout/Modal';
import channelItemModal from '@/styles/channels/ChannelItemModal.module.scss';
import { clipText } from '@/utils/windowEvent';

interface ChannelItemModalProp {
  onClose: () => void;
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
            <div className={channelItemModal['link']}>
              <Link href={url}>유투브 채널</Link>
              <button onClick={() => clipText(url)}>Copy</button>
            </div>
            <div className={channelItemModal['detail']}>
              <div className={channelItemModal['subscribe']}>구독자 {subscribe}</div>
              <div className={channelItemModal['video-count']}>업로드 수 {videoCount} 개</div>
            </div>
          </div>
        </div>

        <div className={channelItemModal['desc']}>{description}</div>
      </div>
    </Modal>
  );
};

export default ChannelItemModal;
