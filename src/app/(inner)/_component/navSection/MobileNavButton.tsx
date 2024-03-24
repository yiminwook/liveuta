'use client';
import useModalStore from '@/hook/useModalStore';
import * as styles from './navSection.css';
import MobileNavModal from '../modal/MobileNavModal';

export default function MobileNavButton() {
  const modalStore = useModalStore();
  const handleOpen = async () => {
    await modalStore.push(MobileNavModal);
  };
  return (
    <button className={styles.mobileNavButton} onClick={handleOpen}>
      ...
    </button>
  );
}
