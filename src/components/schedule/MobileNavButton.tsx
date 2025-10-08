'use client';
import { Button } from '@mantine/core';
import { SlidersHorizontal } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslations } from '@/libraries/i18n/client';
import { TScheduleDto } from '@/types/dto';
import Portal from '../config/portal';
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
  const { t } = useTranslations();
  const [isOpenNavModal, setIsOpenNavModal] = useState(false);

  const openNavModal = () => setIsOpenNavModal(() => true);
  const closeNavModal = () => setIsOpenNavModal(() => false);

  function filterText(filter: typeof scheduleDto.filter) {
    if (filter === 'all') {
      return t('schedule.videoType.filter.all');
    } else if (filter === 'daily') {
      return t('schedule.videoType.filter.daily');
    } else if (filter === 'live') {
      return t('schedule.videoType.filter.live');
    } else {
      return t('schedule.videoType.filter.scheduled');
    }
  }

  function videoTypeText(videoType: typeof scheduleDto.select) {
    if (videoType === 'all') {
      return t('schedule.videoType.all');
    } else if (videoType === 'stream') {
      return t('schedule.videoType.stream');
    } else {
      return t('schedule.videoType.video');
    }
  }

  const text = `${filterText(scheduleDto.filter)} / ${videoTypeText(scheduleDto.select)}: ${
    length[scheduleDto.select]
  }`;

  return (
    <>
      <Button
        className={css.mobileNavBtn}
        classNames={{
          label: css.mobileNavBtnLabel,
        }}
        h={40}
        leftSection={<SlidersHorizontal />}
        variant="default"
        onClick={openNavModal}
      >
        {text}
      </Button>

      <AnimatePresence>
        {isOpenNavModal && (
          <Portal>
            <ScheduleNavModal onClose={closeNavModal} scheduleDto={scheduleDto} length={length} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
