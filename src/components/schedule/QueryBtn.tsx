'use client';
import { useSetModalStore } from '@/stores/modal';
import { TScheduleDto } from '@/types/dto';
import FasFilter from '@icons/fa-solid/Filter';
import { Button, Popover } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import ConfirmModal from '../common/modal/ConfirmModal';
import css from './QueryBtn.module.scss';

type QueryButtonProps = {
  query: TScheduleDto['query'];
};

export default function QueryButton({ query }: QueryButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalActions = useSetModalStore();
  const t = useTranslations('schedule.queryButton');

  const handleReset = async () => {
    const result: true | undefined = await modalActions.push(ConfirmModal, {
      id: 'reset-schedule-query',
      props: {
        message: t('clearFilter'),
      },
    });

    if (!result) return;
    const query = new URLSearchParams(searchParams);
    query.delete('q');
    router.push(`${pathname}?${query.toString()}`);
  };

  if (query === '') return null;

  return (
    <Popover withArrow arrowPosition="center">
      <Popover.Target>
        <Button h={40} bg="var(--mantine-color-body)" variant="outline" leftSection={<FasFilter />}>
          {t('filtering')}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className={css.content}>
          <p className={css.description}>
            {t('now')}: {query}
          </p>
          <Button variant="outline" onClick={handleReset}>
            {t('clear')}
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
