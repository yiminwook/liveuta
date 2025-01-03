import { StreamCategory, StreamCategoryText } from '@/types';
import css from './FeaturedRadio.module.scss';

export default function FeaturedRadio() {
  const items = [
    { label: StreamCategoryText.live, value: StreamCategory.live },
    { label: StreamCategoryText.anniversary, value: StreamCategory.anniversary },
    { label: StreamCategoryText.relay, value: StreamCategory.relay },
    { label: StreamCategoryText.endurance, value: StreamCategory.endurance },
  ];

  return (
    <div>
      {/* <RadioGroup.Root
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
      </RadioGroup.Root> */}
    </div>
  );
}
