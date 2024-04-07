'use client';
import { SegmentGroup, SegmentGroupValueChangeDetails } from '@ark-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { schedule } from '@inner/_lib/atom';
import * as styles from './navTab.css';

const NAV_LINKS = [
  { value: 'scheduled', text: '예정' },
  { value: 'live', text: '라이브' },
  { value: 'daily', text: '24시' },
  { value: 'all', text: '전체' },
];

export default function NavTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter] = useAtom(schedule.filterAtom);

  const handleValueChange = ({ value }: SegmentGroupValueChangeDetails) => {
    const query = new URLSearchParams(searchParams);
    if (value === 'scheduled') {
      query.delete('tab');
    } else {
      query.set('tab', value);
    }
    router.push(`/?${query.toString()}`);
  };

  return (
    <SegmentGroup.Root className={styles.wrap} value={filter} onValueChange={handleValueChange}>
      {NAV_LINKS.map((link) => (
        <SegmentGroup.Item
          tabIndex={0}
          className={styles.link}
          key={`nav-tab-${link.text}`}
          value={link.value}
          disabled={filter === link.value}
        >
          <SegmentGroup.ItemText>{link.text}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  );
}
