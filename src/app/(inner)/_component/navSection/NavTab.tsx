'use client';
import { SegmentGroup } from '@ark-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import * as styles from './navTab.css';

const NAV_LINKS = [
  { herf: '/', text: '예정' },
  { herf: '/live', text: '라이브' },
  { herf: '/daily', text: '24시' },
  { herf: '/all', text: '전체' },
];

export default function NavTab() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <SegmentGroup.Root
      className={styles.wrap}
      value={pathName}
      onValueChange={({ value }) => router.push(value)}
    >
      {NAV_LINKS.map((link) => (
        <SegmentGroup.Item
          tabIndex={0}
          className={styles.link}
          key={`nav-tab-${link.text}`}
          value={link.herf}
          disabled={pathName === link.herf}
        >
          <SegmentGroup.ItemText>{link.text}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  );
}
