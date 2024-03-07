'use client';
import portal from '@/model/portal';
import Modal from '@inner/_component/modal/Modal';
import { setlistModalAtom } from '../_lib/atom';
import TimelineText from '@inner/_component/TimestampText';
import * as styles from '../_component/setlistModal.css';
import { RemoveScroll } from 'react-remove-scroll';
import { isMobile } from 'react-device-detect';
import { useAtom, useSetAtom } from 'jotai';
import { player } from '@inner/_lib/atom';

export default portal('setlistModal', function SetlistModal() {
  const [modalValue, setModalValue] = useAtom(setlistModalAtom);
  const setPlayer = useSetAtom(player.playerStatusAtom);
  const setVideoId = useSetAtom(player.playerVideoIdAtom);
  const onClose = () => setModalValue(null);

  if (!modalValue) return null;

  const handleTimestamp = ({ href, timestamp }: { href: string; timestamp: number }) => {
    if (isMobile) {
      window.location.href = href;
    } else {
      setVideoId(() => modalValue.setlist.videoId);
      setPlayer((pre) => ({ ...pre, timeline: timestamp, isPlaying: true, hide: false }));
    }
  };

  return (
    <RemoveScroll>
      <Modal onClose={onClose}>
        <div className={styles.inner}>
          <div>
            <h4 className={styles.title}>{modalValue.setlist.title}</h4>
          </div>
          <hr />
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
    </RemoveScroll>
  );
});
