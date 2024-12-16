'use client';
import { useSetModalStore } from '@/stores/modal';
import { FilterText, SelectedText } from '@/types';
import { TScheduleDto } from '@/types/dto';
import { BsSliders } from 'react-icons/bs';
import MobileNavModal from '../common/modal/MobileNavModal';
import css from './ScheduleNav.module.scss';

type MobileNavButtonProps = {
  length: {
    all: number;
    stream: number;
    video: number;
  };
  scheduleDto: TScheduleDto;
};

export default function MobileNavButton({ length, scheduleDto }: MobileNavButtonProps) {
  const modalStore = useSetModalStore();

  const handleOpen = async () => {
    await modalStore.push(MobileNavModal, {
      props: {
        scheduleDto,
        length,
      },
    });
  };

  const text = `${FilterText[scheduleDto.filter]} / ${SelectedText[scheduleDto.select]}: ${
    length[scheduleDto.select]
  }`;

  return (
    <button className={css.mobileNavBtn} onClick={handleOpen}>
      <BsSliders size="1rem" style={{ minWidth: '1rem' }} />
      <span className={css.text}>{text}</span>
    </button>
  );
}
