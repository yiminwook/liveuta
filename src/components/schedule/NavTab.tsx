'use client';
import { scheduleDto } from '@/types/dto';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NAV_LINKS: SegmentedControlItem[] = [
  { value: 'scheduled', label: '예정' },
  { value: 'live', label: '라이브' },
  { value: 'daily', label: '24시' },
  { value: 'all', label: '전체' },
];

type NavTabProps = {};

export default function NavTab({}: NavTabProps) {
  const pathname = usePathname();
  const router = useRouter();
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
      withItemsBorders={false}
      value={filter}
      onChange={handleValueChange}
      data={NAV_LINKS}
      size="sm"
      h={40}
    />
  );
}
