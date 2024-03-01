import portal from '@/model/portal';
import Modal from '@inner/_component/modal/Modal';
import { useSetlistModalAtom } from '../_lib/atom';
import Text from './Text';
import * as styles from './setlistModal.css';
import { RemoveScroll } from 'react-remove-scroll';

export default portal('setlistModal', function SetlistModal() {
  const [modalValue, setModalValue] = useSetlistModalAtom();

  const onClose = () => setModalValue(null);
  if (!modalValue) return null;

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
              <Text key={`${modalValue.setlist.videoId}_row_${index}`} text={line} />
            ))}
          </div>
        </div>
      </Modal>
    </RemoveScroll>
  );
});
