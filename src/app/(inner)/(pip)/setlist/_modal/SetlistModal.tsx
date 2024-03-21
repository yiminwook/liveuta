import { ModalProps } from '@/model/modal/ModalController';
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import { generateVideoUrl } from '@/model/youtube/url';
import TimelineText from '@inner/_component/TimestampText';
import Modal from '@inner/_component/modal/Modal';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import * as styles from '../_component/setlistModal.css';

type SetlistModalProps = {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
  order: 'broadcast' | 'create';
};

const SETLIST_MODAL_ID = 'setlistModal';

export default function SetlistModal({
  setlist,
  channel,
  order,
  onClose,
}: ModalProps<SetlistModalProps>) {
  const router = useRouter();

  const handleTimestamp = ({ videoId, timestamp }: { videoId: string; timestamp: number }) => {
    if (isMobile) {
      const videoUrl = generateVideoUrl(videoId);
      window.location.href = videoUrl + `&t=${timestamp}`;
    } else {
      router.push(`/setlist/${videoId}?t=${timestamp}`);
    }
  };

  return (
    <Modal id={SETLIST_MODAL_ID} onClose={onClose} title={setlist.title}>
      <div className={styles.inner}>
        <div className={styles.descBox}>
          {setlist.description.split('\n').map((line, index) => (
            <TimelineText
              key={`${setlist.videoId}_row_${index}`}
              index={index}
              text={line}
              videoId={setlist.videoId}
              onClickTimestamp={handleTimestamp}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
