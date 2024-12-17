'use client';
import { scheduleDto } from '@/types/dto';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { usePathname, useSearchParams } from 'next/navigation';

const NAV_LINKS: SegmentedControlItem[] = [
  { value: 'scheduled', label: '예정' },
  { value: 'live', label: '라이브' },
  { value: 'daily', label: '24시' },
  { value: 'all', label: '전체' },
];

export default function NavTab() {
  const pathname = usePathname();
  const router = useRouter(); // transition 효과 제외
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get('t');
  const { filter } = scheduleDto.pick({ filter: true }).parse({ filter: filterQuery });

  const handleValueChange = (value: string) => {
    const query = new URLSearchParams(searchParams);
    if (value === 'scheduled') {
      query.delete('t');
    } else {
      query.set('t', value);
    }
    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <SegmentedControl
      styles={{ root: { boxShadow: '0px 0px 0px 1px var(--mantine-color-default-border)' } }}
      value={filter}
      withItemsBorders={false}
      onChange={handleValueChange}
      data={NAV_LINKS}
      size="sm"
      h={40}
    />
  );
}
