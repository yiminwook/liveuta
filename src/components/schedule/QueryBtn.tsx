'use client';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { usePathname } from '@/libraries/i18n/client';
import { useSetModalStore } from '@/stores/modal';
import { TScheduleDto } from '@/types/dto';
import { useRouter } from '@bprogress/next';
import { Button, Popover } from '@mantine/core';
import { Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import ConfirmModal from '../common/modal/ConfirmModal';
import css from './QueryBtn.module.scss';

type QueryButtonProps = {
  query: TScheduleDto['query'];
};

export default function QueryButton({ query }: QueryButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslations();

  const searchParams = useSearchParams();
  const modalActions = useSetModalStore();

  const handleReset = async () => {
    const result: true | undefined = await modalActions.push(ConfirmModal, {
      id: 'reset-schedule-query',
      props: {
        message: t('schedule.queryButton.clearFilter'),
        locale,
      },
    });

    if (!result) return;
    const query = new URLSearchParams(searchParams);
    query.delete('q');
    router.push(`/${locale}${pathname}?${query.toString()}`);
  };

  if (query === '') return null;

  return (
    <Popover withArrow arrowPosition="center">
      <Popover.Target>
        <Button h={40} bg="var(--mantine-color-body)" variant="outline" leftSection={<Filter />}>
          {t('schedule.queryButton.filtering')}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className={css.content}>
          <p className={css.description}>
            {t('schedule.queryButton.now')}: {query}
          </p>
          <Button variant="outline" onClick={handleReset}>
            {t('schedule.queryButton.clear')}
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
