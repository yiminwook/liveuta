'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { useSetModalStore } from '@/stores/modal';
import { TScheduleDto } from '@/types/dto';
import BiSliders from '@icons/bi/Sliders';
import { Button } from '@mantine/core';
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
  const locale = useLocale();
  const { t } = useTranslations(locale);

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
