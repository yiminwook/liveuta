'use client';
import ListModal from '@/components/common/modal/MultiListModal';
import { useSetModalStore } from '@/stores/modal';
import { FaPlus } from 'react-icons/fa6';
import css from './Nav.module.scss';

export default function Nav() {
  const modalStore = useSetModalStore();

  const open = async () => {
    await modalStore.push(ListModal, {});
  };

  return (
    <button className={css.wrap} onClick={open}>
      <FaPlus size="1.5rem" />
    </button>
  );
}
