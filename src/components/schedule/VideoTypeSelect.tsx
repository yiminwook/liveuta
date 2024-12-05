'use client';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { SelectedText } from '@/types';
import { TScheduleDto } from '@/types/dto';
import { ComboboxItem, ComboboxItemGroup, Select } from '@mantine/core';
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

  const handleSelect = (value: string | null, _option: ComboboxItem) => {
    if (value === null) return;
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    router.refresh();
  };

  const data: ComboboxItemGroup[] = [
    {
      group: '와꾸종류',
      items: [
        { label: `${SelectedText.all}: ${length.all}`, value: 'all', disabled: select === 'all' },
        {
          label: `${SelectedText.stream}: ${length.stream}`,
          value: 'stream',
          disabled: select === 'stream',
        },
        {
          label: `${SelectedText.video}: ${length.video}`,
          value: 'video',
          disabled: select === 'video',
        },
      ],
    },
  ];

  return (
    <Select
      w={140}
      size="md"
      h={40}
      className={css.select}
      value={select}
      data={data}
      onChange={handleSelect}
    />
  );
}
