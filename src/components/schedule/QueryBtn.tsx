'use client';
import { usePathname } from 'next/navigation';
import { useSetModalStore } from '@/stores/modal';
import { TScheduleDto } from '@/types/dto';
import { Button, Popover } from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import FasFilter from '~icons/fa-solid/filter.jsx';
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

  const handleReset = async () => {
    const result: true | undefined = await modalActions.push(ConfirmModal, {
      id: 'reset-schedule-query',
      props: {
        message: '검색 필터링을 초기화하시겠습니까?',
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
          검색 필터링 중
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className={css.content}>
          <p className={css.description}>현재: {query}</p>
          <Button variant="outline" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
