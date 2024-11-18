import { categoryAtom, featuredAtom } from '@/stores/schedule/featured';
import { StreamCategory, StreamCategoryText } from '@/types';
import { useAtom } from 'jotai';
import { Select } from '@ark-ui/react';
import * as styles from './featuredSelect.css';
import { HiSelector } from 'react-icons/hi';

export default function FeaturedSelect() {
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