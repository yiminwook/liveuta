'use client';
import Cookies from 'universal-cookie';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { Select, SelectValueChangeDetails } from '@ark-ui/react';
import { HiSelector } from 'react-icons/hi';

import { VideoType, SelectedText, StreamCategory, StreamCategoryText } from '@/types';
import { selectAtom, selectedScheduleAtom } from '@/stores/schedule';
import { categoryAtom, featuredAtom } from '@/stores/schedule/featured';

import * as styles from './videoTypeSelect.css';

type Item = { label: string; value: VideoType; disabled?: boolean };

function VideoTypeFilter() {
  const router = useRouter();
  const [select] = useAtom(selectAtom);
  const [selectedSchedule] = useAtom(selectedScheduleAtom);

  const handleSelect = (e: SelectValueChangeDetails<Item>) => {
    const value = e.items[0].value;
    const selectCookie = new Cookies();
    selectCookie.set('select', value, { path: '/', maxAge: 60 * 60 * 24 * 30 * 3 }); //3개월 저장
    router.refresh();
  };

  const items: Item[] = [
    { label: SelectedText.all, value: VideoType.all, disabled: select === VideoType.all },
    { label: SelectedText.stream, value: VideoType.stream, disabled: select === VideoType.stream },
    { label: SelectedText.video, value: VideoType.video, disabled: select === VideoType.video },
  ];

  const selectedText = {
    all: `${SelectedText.all}: ${selectedSchedule.length.all}`,
    stream: `${SelectedText.stream}: ${selectedSchedule.length.stream}`,
    video: `${SelectedText.video}: ${selectedSchedule.length.video}`,
  };

  return (
    <Select.Root
      className={styles.root}
      items={items}
      value={[select]}
      onValueChange={handleSelect}
    >
      <Select.Control>
        <Select.Trigger className={styles.trigger}>
          <Select.ValueText>{selectedText[select]}</Select.ValueText>
          <Select.Indicator>
            <HiSelector size="1.5rem" />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner className={styles.positioner}>
        <Select.Content className={styles.content}>
          <Select.ItemGroup id="videoTypeSelectGroup" className={styles.group}>
            <Select.ItemGroupLabel className={styles.groupLabel} htmlFor="videoTypeSelectGroup">
              와꾸종류
            </Select.ItemGroupLabel>
            {items.map((item) => (
              <Select.Item key={item.value} className={styles.item} item={item}>
                <Select.ItemText>{selectedText[item.value]}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

function CategorySelect() {
  const [featureSelected] = useAtom(featuredAtom);
  const [select, setSelect] = useAtom(categoryAtom);

  const items = [
    { label: StreamCategoryText.live, value: StreamCategory.live },
    { label: StreamCategoryText.anniversary, value: StreamCategory.anniversary },
    { label: StreamCategoryText.relay, value: StreamCategory.relay },
    { label: StreamCategoryText.endurance, value: StreamCategory.endurance },
  ];

  return (
    <Select.Root
      className={styles.root}
      items={items}
      onValueChange={(e) => {
        setSelect(e.items[0].value);
      }}
    >
      <Select.Control>
        <Select.Trigger className={styles.trigger} disabled={featureSelected === 'vtubers'}>
          <Select.ValueText>{items.find((item) => item.value === select)?.label}</Select.ValueText>
          <Select.Indicator>
            <HiSelector size="1.5rem" />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner className={styles.positioner}>
        <Select.Content className={styles.content}>
          <Select.ItemGroup id="videoTypeSelectGroup" className={styles.group}>
            <Select.ItemGroupLabel className={styles.groupLabel} htmlFor="videoTypeSelectGroup">
              방송 분류
            </Select.ItemGroupLabel>
            {items.map((item) => (
              <Select.Item key={item.value} className={styles.item} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

export default function VideoTypeSelect({ filter }: { filter: string }) {
  return filter === 'featured' ? <CategorySelect /> : <VideoTypeFilter />;
}
