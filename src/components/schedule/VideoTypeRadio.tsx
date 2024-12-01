'use client';

import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupValueChangeDetails } from '@ark-ui/react';
import { SelectedText } from '@/types';
import * as styles from './videoTypeRadio.css';
import { TScheduleDto } from '@/types/dto';

const Items = ['all', 'stream', 'video'] as const;

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

  const handleSelect = ({ value }: RadioGroupValueChangeDetails) => {
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    router.refresh();
  };

  const selectedText = {
    all: `${SelectedText.all}: ${length.all}`,
    stream: `${SelectedText.stream}: ${length.stream}`,
    video: `${SelectedText.video}: ${length.video}`,
  };

  return (
    <RadioGroup.Root className={styles.root} defaultValue={select} onValueChange={handleSelect}>
      <RadioGroup.Label className={styles.radioLabel}>와꾸종류</RadioGroup.Label>
      <div className={styles.itemBox}>
        {Items.map((item) => (
          <RadioGroup.Item
            key={`mobileModalVideoTypeRadio_${item}`}
            className={styles.item}
            value={item}
          >
            <RadioGroup.ItemControl className={styles.itemControl} />
            <RadioGroup.ItemText>{selectedText[item]}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </div>
    </RadioGroup.Root>
  );
}
