'use client';
import useModalStore from '@/hooks/useModalStore';
import { FilterText, SelectedText, StreamCategoryText } from '@/types';
import { filterAtom, selectAtom, selectedScheduleAtom } from '@/stores/schedule';
import { useAtom } from 'jotai';
import { BsSliders } from 'react-icons/bs';
import MobileNavModal from '../modal/MobileNavModal';
import * as styles from './navSection.css';
import { categoryAtom } from '@/stores/schedule/featured';

export default function MobileNavButton() {
  const modalStore = useModalStore();
  const [select] = useAtom(selectAtom);
  const [filter] = useAtom(filterAtom);
  const [selectedSchedule] = useAtom(selectedScheduleAtom);
  const [category] = useAtom(categoryAtom);

  const handleOpen = async () => {
    await modalStore.push(MobileNavModal);
  };

  const text =
    filter === 'featured'
      ? StreamCategoryText[category]
      : `${FilterText[filter]} / ${SelectedText[select]}: ${selectedSchedule.length[select]}`;

  return (
    <button className={styles.mobileNavButton} onClick={handleOpen}>
      <BsSliders size="1rem" style={{ minWidth: '1rem' }} />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
