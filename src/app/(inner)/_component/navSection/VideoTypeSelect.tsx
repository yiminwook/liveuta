'use client';
import { VideoType, SelectedText } from '@/type';
import { Select, SelectValueChangeDetails } from '@ark-ui/react';
import { selectAtom, selectedScheduleAtom } from '@inner/_lib/atom/schedule';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { HiSelector } from 'react-icons/hi';
import Cookies from 'universal-cookie';
import * as styles from './videoTypeSelect.css';

type Item = { label: string; value: VideoType; disabled?: boolean };

export default function VideoTypeSelect() {
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
    { label: SelectedText.total, value: VideoType.all, disabled: select === VideoType.all },
    { label: SelectedText.stream, value: VideoType.stream, disabled: select === VideoType.stream },
    { label: SelectedText.video, value: VideoType.video, disabled: select === VideoType.video },
  ];

  const selectedText = {
    all: `${SelectedText.total}: ${selectedSchedule.length.all}`,
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
