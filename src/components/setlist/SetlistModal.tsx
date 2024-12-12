import TimelineText from '@/components/common/TimestampText';
import Modal from '@/components/common/modal/Modal';
import { ModalProps } from '@/libraries/modal/ModalController';
import { ChannelDataset } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { useRouter } from 'next-nprogress-bar';
import { useTransitionRouter } from 'next-view-transitions';
import { isMobile } from 'react-device-detect';
import css from './SetListModal.module.scss';

type SetlistModalProps = {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
  order: 'broadcast' | 'create';
};

const SETLIST_MODAL_ID = 'setlistModal';

export default function SetlistModal({ setlist, onClose }: ModalProps<SetlistModalProps>) {
  const router = useRouter(useTransitionRouter);

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
      <div className={css.inner}>
        <div className={css.descBox}>
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
