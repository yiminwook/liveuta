'use client';
import { useTranslations } from '@/libraries/i18n/client';
import { TScheduleDto } from '@/types/dto';
import { Group, Radio } from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import Cookies from 'universal-cookie';

type VideoTypeRadioProps = {
  select: TScheduleDto['select'];
  length: {
    all: number;
    stream: number;
    video: number;
  };
};

export default function VideoTypeRadio({ select, length }: VideoTypeRadioProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const [value, setValue] = useState<TScheduleDto['select']>(select);

  const handleSelect = (value: string) => {
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    setValue(() => value as TScheduleDto['select']);
    router.refresh();
  };

  const items = [
    { label: `${t('schedule.videoType.all')}: ${length.all}`, value: 'all' },
    {
      label: `${t('schedule.videoType.stream')}: ${length.stream}`,
      value: 'stream',
    },
    {
      label: `${t('schedule.videoType.video')}: ${length.video}`,
      value: 'video',
    },
  ];

  return (
    <Radio.Group label={t('schedule.videoType.groupLabel')} value={value} onChange={handleSelect}>
      <Group mt={14}>
        {items.map((item) => (
          <Radio key={`radio_${item.value}`} value={item.value} label={item.label} />
        ))}
      </Group>
    </Radio.Group>
  );
}
