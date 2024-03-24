'use client';
import useModalStore from '@/hook/useModalStore';
import { FilterText, SelectedText } from '@/type';
import { filterAtom, selectAtom, selectedScheduleAtom } from '@inner/_lib/atom/schedule';
import { useAtom } from 'jotai';
import { BsSliders } from 'react-icons/bs';
import MobileNavModal from '../modal/MobileNavModal';
import * as styles from './navSection.css';

export default function MobileNavButton() {
  const modalStore = useModalStore();
  const [select] = useAtom(selectAtom);
  const [filter] = useAtom(filterAtom);
  const [selectedSchedule] = useAtom(selectedScheduleAtom);

  const handleOpen = async () => {
    await modalStore.push(MobileNavModal);
  };

  const text = `${FilterText[filter]} /${SelectedText[select]}: ${selectedSchedule.length[select]}`;

  return (
    <button className={styles.mobileNavButton} onClick={handleOpen}>
      <BsSliders size="1rem" />
      <span>{text}</span>
    </button>
  );
}
