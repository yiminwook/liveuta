'use client';
import { SegmentGroup, SegmentGroupValueChangeDetails } from '@ark-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as styles from './navTab.css';
import { TScheduleDto } from '@/types/dto';

const NAV_LINKS = [
  { value: 'scheduled', text: '예정' },
  { value: 'live', text: '라이브' },
  { value: 'daily', text: '24시' },
  { value: 'all', text: '전체' },
];

type NavTabProps = {
  filter: TScheduleDto['filter'];
};

export default function NavTab({ filter }: NavTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleValueChange = ({ value }: SegmentGroupValueChangeDetails) => {
    const query = new URLSearchParams(searchParams);
    if (value === 'scheduled') {
      query.delete('t');
    } else {
      query.set('t', value);
    }
    router.push(`${pathname}?${query.toString()}`);
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
