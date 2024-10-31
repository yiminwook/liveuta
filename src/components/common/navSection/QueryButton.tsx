'use client';
import { queryAtom } from '@/stores/schedule';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaFilter } from 'react-icons/fa';
import { Popover } from '@ark-ui/react';
import * as styles from './queryButton.css';

export default function QueryButton() {
  const [query] = useAtom(queryAtom);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReset = () => {
    if (confirm('검색 필터링을 초기화하시겠습니까?')) {
      const query = new URLSearchParams(searchParams);
      query.delete('q');
      router.push(`${pathname}?${query.toString()}`);
    }
  };

  if (query === '') return null;

  return (
    <div className={styles.root}>
      <Popover.Root open>
        <Popover.Trigger className={styles.trigger} onClick={handleReset}>
          <FaFilter size="1rem" style={{ flexShrink: 0 }} />
          <span className={styles.text}>검색 필터링 중</span>
        </Popover.Trigger>
        <Popover.Positioner
          className={styles.positioner}
          style={{
            top: -10,
            paddingTop: 10,
          }}
        >
          <Popover.Content className={styles.content}>
            <Popover.Description className={styles.description}>현재: {query}</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </div>
  );
}
