import { ModalBaseProps } from '@/model/modal/ModalController';
import Modal from './Modal';
import * as styles from './mobileNavModal.css';
import NavTab from '../navSection/NavTab';
import VideoTypeRadio from '../navSection/VideoTypeRadio';
import { useEffect } from 'react';

const MOBILE_NAV_MODAL_ID = 'mobileNavModal';

export default function MobileNavModal({ onClose }: ModalBaseProps) {
  useEffect(() => {
    window.addEventListener('resize', onClose);
    return () => {
      window.removeEventListener('resize', onClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal id={MOBILE_NAV_MODAL_ID} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.navTabBox}>
          <NavTab />
        </div>
        <VideoTypeRadio />
      </div>
    </Modal>
  );
}
