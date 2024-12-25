'use client';
import { useSetModalStore } from '@/stores/modal';
import { FilterText, SelectedText } from '@/types';
import { TScheduleDto } from '@/types/dto';
import { Button } from '@mantine/core';
import { BsSliders } from 'react-icons/bs';
import css from './ScheduleNav.module.scss';
import ScheduleNavModal from './ScheduleNavModal';

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
    await modalStore.push(ScheduleNavModal, {
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
    <Button
      className={css.mobileNavBtn}
      classNames={{
        label: css.mobileNavBtnLabel,
      }}
      h={40}
      leftSection={<BsSliders />}
      variant="default"
      onClick={handleOpen}
    >
      {text}
    </Button>
  );
}
