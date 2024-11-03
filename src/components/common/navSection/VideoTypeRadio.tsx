'use client';
import { useAtom } from 'jotai';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupValueChangeDetails } from '@ark-ui/react';

import { SelectedText, VideoType, StreamCategory, StreamCategoryText } from '@/types';
import { filterAtom, selectAtom, selectedScheduleAtom } from '@/stores/schedule';

import * as styles from './videoTypeRadio.css';
import { categoryAtom, featuredAtom } from '@/stores/schedule/featured';

const Items = [VideoType.all, VideoType.stream, VideoType.video];

export default function VideoTypeRadio() {
  const [filter] = useAtom(filterAtom);

  return filter === 'featured' ? <CategorySelectRadio /> : <VideoFilter />;
}

function VideoFilter() {
  const router = useRouter();
  const [select] = useAtom(selectAtom);
  const [selectedSchedule] = useAtom(selectedScheduleAtom);

  const handleSelect = ({ value }: RadioGroupValueChangeDetails) => {
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    router.refresh();
  };

  const selectedText = {
    all: `${SelectedText.all}: ${selectedSchedule.length.all}`,
    stream: `${SelectedText.stream}: ${selectedSchedule.length.stream}`,
    video: `${SelectedText.video}: ${selectedSchedule.length.video}`,
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

function CategorySelectRadio() {
  const [featuredSelected] = useAtom(featuredAtom);
  const [select, setSelect] = useAtom(categoryAtom);

  const items = [
    { label: StreamCategoryText.live, value: StreamCategory.live },
    { label: StreamCategoryText.anniversary, value: StreamCategory.anniversary },
    { label: StreamCategoryText.relay, value: StreamCategory.relay },
    { label: StreamCategoryText.endurance, value: StreamCategory.endurance },
  ];

  return (
    <div>
      <RadioGroup.Root
        className={styles.root}
        defaultValue={select}
        onValueChange={(e) => setSelect(e.value as StreamCategory)}
      >
        <RadioGroup.Label className={styles.radioLabel}>카테고리</RadioGroup.Label>
        <div className={styles.itemBox}>
          {items.map((item) => (
            <RadioGroup.Item
              key={`mobileModalCategoryRadio_${item.value}`}
              className={styles.item}
              value={item.value}
              data-disabled={featuredSelected === 'vtubers'}
            >
              <RadioGroup.ItemControl
                className={styles.itemControl}
                data-disabled={featuredSelected === 'vtubers'}
              />
              <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </div>
      </RadioGroup.Root>
    </div>
  );
}
