'use client';
import { TScheduleDto } from '@/types/dto';
import { ComboboxItemGroup, Select } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import Cookies from 'universal-cookie';
import css from './ScheduleNav.module.scss';

type VideoTypeSelectProps = {
  select: TScheduleDto['select'];
  length: {
    all: number;
    stream: number;
    video: number;
  };
};

export default function VideoTypeSelect({ select, length }: VideoTypeSelectProps) {
  const router = useRouter();
  const t = useTranslations('schedule.videoType');

  const handleSelect = (value: string | null) => {
    if (value === null) return;
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    router.refresh();
  };

  const data: ComboboxItemGroup[] = [
    {
      group: t('groupLabel'),
      items: [
        { label: `${t('all')}: ${length.all}`, value: 'all', disabled: select === 'all' },
        {
          label: `${t('stream')}: ${length.stream}`,
          value: 'stream',
          disabled: select === 'stream',
        },
        {
          label: `${t('video')}: ${length.video}`,
          value: 'video',
          disabled: select === 'video',
        },
      ],
    },
  ];

  return (
    <Select
      w={140}
      h={40}
      className={css.select}
      value={select}
      data={data}
      onChange={handleSelect}
    />
  );
}
