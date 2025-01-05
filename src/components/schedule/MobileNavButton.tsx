'use client';
import { useSetModalStore } from '@/stores/modal';
import { TScheduleDto } from '@/types/dto';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import BiSliders from '~icons/bi/sliders.jsx';
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
  const t = useTranslations('schedule.videoType');

  const handleOpen = async () => {
    await modalStore.push(ScheduleNavModal, {
      props: {
        scheduleDto,
        length,
      },
    });
  };

  function filterText(filter: typeof scheduleDto.filter) {
    if (filter === 'all') {
      return t('filter.all');
    } else if (filter === 'daily') {
      return t('filter.daily');
    } else if (filter === 'live') {
      return t('filter.live');
    } else {
      return t('filter.scheduled');
    }
  }

  function videoTypeText(videoType: typeof scheduleDto.select) {
    if (videoType === 'all') {
      return t('all');
    } else if (videoType === 'stream') {
      return t('stream');
    } else {
      return t('video');
    }
  }

  const text = `${filterText(scheduleDto.filter)} / ${videoTypeText(scheduleDto.select)}: ${
    length[scheduleDto.select]
  }`;

  return (
    <Button
      className={css.mobileNavBtn}
      classNames={{
        label: css.mobileNavBtnLabel,
      }}
      h={40}
      leftSection={<BiSliders />}
      variant="default"
      onClick={handleOpen}
    >
      {text}
    </Button>
  );
}
