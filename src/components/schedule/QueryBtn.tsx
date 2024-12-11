'use client';
import { TScheduleDto } from '@/types/dto';
import { Button, Popover, UnstyledButton } from '@mantine/core';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaFilter } from 'react-icons/fa';
import css from './QueryBtn.module.scss';

type QueryButtonProps = {
  query: TScheduleDto['query'];
};

export default function QueryButton({ query }: QueryButtonProps) {
  const pathname = usePathname();
  const router = useTransitionRouter();
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
    <Popover withArrow arrowPosition="center">
      <Popover.Target>
        <UnstyledButton className={css.target}>
          <FaFilter size="1rem" />
          <span className={css.text}>검색 필터링 중</span>
        </UnstyledButton>
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
