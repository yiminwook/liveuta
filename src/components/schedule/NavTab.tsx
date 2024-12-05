'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TScheduleDto } from '@/types/dto';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import css from './NavTab.module.scss';
import variable from '@variable';

const NAV_LINKS: SegmentedControlItem[] = [
  { value: 'scheduled', label: '예정' },
  { value: 'live', label: '라이브' },
  { value: 'daily', label: '24시' },
  { value: 'all', label: '전체' },
];

type NavTabProps = {
  filter: TScheduleDto['filter'];
};

export default function NavTab({ filter }: NavTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
      className={css.wrap}
      color={variable.thirdColorDefault}
      value={filter}
      onChange={handleValueChange}
      data={NAV_LINKS}
      size="sm"
      h={40}
    />
  );
}
