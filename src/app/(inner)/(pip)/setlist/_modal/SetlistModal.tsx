'use client';
import portal from '@/model/portal';
import Modal from '@inner/_component/modal/Modal';
import { setlistModalAtom } from '../_lib/atom';
import TimelineText from '@inner/_component/TimestampText';
import * as styles from '../_component/setlistModal.css';
import { RemoveScroll } from 'react-remove-scroll';
import { isMobile } from 'react-device-detect';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { generateVideoUrl } from '@/model/youtube/url';

const SETLIST_MODAL_ID = 'setlistModal';

export default portal(SETLIST_MODAL_ID, function SetlistModal() {
  const router = useRouter();
  const [modalValue, setModalValue] = useAtom(setlistModalAtom);
  const onClose = () => setModalValue(null);

  if (!modalValue) return null;

  const handleTimestamp = ({ videoId, timestamp }: { videoId: string; timestamp: number }) => {
    if (isMobile) {
      const videoUrl = generateVideoUrl(videoId);
      window.location.href = videoUrl + `&t=${timestamp}`;
    } else {
      router.push(`/setlist/${videoId}?t=${timestamp}`);
    }
  };

  return (
    <Modal id={SETLIST_MODAL_ID} onClose={onClose} title={modalValue.setlist.title}>
      <div className={styles.inner}>
        <div className={styles.descBox}>
          {modalValue.setlist.description.split('\n').map((line, index) => (
            <TimelineText
              key={`${modalValue.setlist.videoId}_row_${index}`}
              index={index}
              text={line}
              videoId={modalValue.setlist.videoId}
              onClickTimestamp={handleTimestamp}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
});
