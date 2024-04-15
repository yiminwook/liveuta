'use client';
import useModalStore from '@/hook/useModalStore';
import * as styles from './nav.css';
import { FaPlus } from 'react-icons/fa6';
import ListModal from '@inner/_component/modal/MultiListModal';

export default function Nav() {
  const modalStore = useModalStore();
  const open = async () => {
    await modalStore.push(ListModal, {});
  };
  return (
    <button className={styles.wrap} onClick={open}>
      <FaPlus size="1.5rem" />
    </button>
  );
}
