'use client';
import { darkModeAtom } from '@/stores/atom';
import { RadioGroup } from '@ark-ui/react';
import { useAtom } from 'jotai';
import * as styles from './darkModeRadio.css';

const Items = ['ON', 'OFF'];

export default function DarkModeRadio() {
  const [isDarkMode, toggleDarkMode] = useAtom(darkModeAtom);

  const handleSelect = () => toggleDarkMode();

  return (
    <RadioGroup.Root
      className={styles.root}
      defaultValue={isDarkMode ? 'ON' : 'OFF'}
      onValueChange={handleSelect}
    >
      <RadioGroup.Label className={styles.radioLabel}>다크모드</RadioGroup.Label>
      <div className={styles.itemBox}>
        {Items.map((item) => (
          <RadioGroup.Item key={`darkModeRadio_${item}`} className={styles.item} value={item}>
            <RadioGroup.ItemControl className={styles.itemControl} />
            <RadioGroup.ItemText>{item}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </div>
    </RadioGroup.Root>
  );
}
