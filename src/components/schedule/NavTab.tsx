'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { usePathname } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { scheduleDto } from '@/types/dto';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

export default function NavTab() {
  const pathname = usePathname();
  const router = useRouter(); // transition 효과 제외
  const locale = useLocale();
  const { t } = useTranslations(locale);

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
    router.push(`/${locale}${pathname}?${query.toString()}`);
  };

  const navLinks: SegmentedControlItem[] = [
    { value: 'scheduled', label: t('schedule.navTab.scheduled') },
    { value: 'live', label: t('schedule.navTab.live') },
    { value: 'daily', label: t('schedule.navTab.daily') },
    { value: 'all', label: t('schedule.navTab.all') },
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
