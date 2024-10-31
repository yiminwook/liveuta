import { ModalBaseProps } from '@/libraries/modal/ModalController';
import Modal from './Modal';
import * as styles from './mobileNavModal.css';
import NavTab from '@/components/common/navSection/NavTab';
import VideoTypeRadio from '@/components/common/navSection/VideoTypeRadio';
import SearchInput from '@/components/common/header/SearchInput';

const MOBILE_NAV_MODAL_ID = 'mobileNavModal';

export default function MobileNavModal({ onClose }: ModalBaseProps) {
  return (
    <Modal id={MOBILE_NAV_MODAL_ID} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.navTabBox}>
          <NavTab />
        </div>
        <SearchInput />
        <VideoTypeRadio />
      </div>
    </Modal>
  );
}
