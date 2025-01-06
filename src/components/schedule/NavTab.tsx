'use client';
import { scheduleDto } from '@/types/dto';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function NavTab() {
  const pathname = usePathname();
  const router = useRouter(); // transition 효과 제외
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get('t');
  const { filter } = scheduleDto.pick({ filter: true }).parse({ filter: filterQuery });
  const t = useTranslations('schedule.navTab');

  const handleValueChange = (value: string) => {
    const query = new URLSearchParams(searchParams);
    if (value === 'scheduled') {
      query.delete('t');
    } else {
      query.set('t', value);
    }
    router.push(`${pathname}?${query.toString()}`);
  };

  const navLinks: SegmentedControlItem[] = [
    { value: 'scheduled', label: t('scheduled') },
    { value: 'live', label: t('live') },
    { value: 'daily', label: t('daily') },
    { value: 'all', label: t('all') },
  ];

  return (
    <SegmentedControl
      value={filter}
      withItemsBorders={false}
      onChange={handleValueChange}
      data={navLinks}
      size="sm"
      h={40}
    />
  );
}
