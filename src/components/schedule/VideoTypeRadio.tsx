'use client';
import { SelectedText } from '@/types';
import { TScheduleDto } from '@/types/dto';
import { Group, Radio } from '@mantine/core';
import variable from '@variable';
import { useRouter } from 'next/navigation';
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
  const [value, setValue] = useState<TScheduleDto['select']>(select);

  const handleSelect = (value: string) => {
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    setValue(() => value as TScheduleDto['select']);
    router.refresh();
  };

  const items = [
    { label: `${SelectedText.all}: ${length.all}`, value: 'all' },
    {
      label: `${SelectedText.stream}: ${length.stream}`,
      value: 'stream',
    },
    {
      label: `${SelectedText.video}: ${length.video}`,
      value: 'video',
    },
  ];

  return (
    <Radio.Group label="와꾸종류" value={value} onChange={handleSelect}>
      <Group mt={14}>
        {items.map((item) => (
          <Radio key={`radio_${item.value}`} value={item.value} label={item.label} />
        ))}
      </Group>
    </Radio.Group>
  );
}
