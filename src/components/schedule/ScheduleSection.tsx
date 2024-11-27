'use client';
import { SCROLL_PER_YOUTUBE_CARD } from '@/constants';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { ContentsDataType } from '@/types/api/mongoDB';
import { filterAtom, queryAtom, selectedScheduleAtom } from '@/stores/schedule';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Nodata from '../common/Nodata';
import ScheduleCard from '../common/scheduleCard/Card';
import { VirtuosoGrid } from 'react-virtuoso';
import css from './ScheduleSection.module.scss';
import { Button } from '@mantine/core';

type ScheduleSectionProps = {
  session: Session | null;
};

export default function ScheduleSection({ session }: ScheduleSectionProps) {
  const [filter] = useAtom(filterAtom);
  const status = useScheduleStatus();
  const [loadContents, setLoadContents] = useState<ContentsDataType[]>([]);
  const [scrollPage, setScrollPage] = useState(1);
  const [selectedData] = useAtom(selectedScheduleAtom);
  const [query] = useAtom(queryAtom);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const isDone = loadContents.length >= selectedData.content.length;

  const handleInfinityScroll = () => {
    if (debounceRef.current) return;
    debounceRef.current = setTimeout(() => {
      if (!isDone) {
        setScrollPage((pre) => pre + 1);
      }
      debounceRef.current = null;
    }, 200);
  };

  useEffect(() => {
    // 페이지가 바뀌면 데이터 추가로 로드
    if (isDone) return;

    const nextContents = selectedData.content.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => nextContents);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPage]);

  useEffect(() => {
    // 스케쥴 데이터가 바뀌면 최신화
    const resetContent = selectedData.content.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  useEffect(() => {
    // 필터가 바뀌면 페이지를 리셋
    const resetContent = selectedData.content.slice(0, SCROLL_PER_YOUTUBE_CARD);
    setScrollPage(() => 1);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  if (status === 'success' && query && selectedData.content.length === 0) {
    // 검색 결과가 없을 때
    return (
      <section>
        <Nodata />
        <div className={css.nodataLinkBox}>
          <Button component={Link} href={`/channel?q=${query}`}>
            채널페이지에서 검색
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={css.expand}>
      <VirtuosoGrid
        totalCount={selectedData.content.length}
        data={loadContents}
        // components={{ Scroller }}
        listClassName={css.list}
        itemClassName={css.item}
        itemContent={(_i, data) => (
          <ScheduleCard session={session} key={`scheduleCard_${data.videoId}`} content={data} />
        )}
        overscan={10}
        endReached={handleInfinityScroll}
        className={css.vertuso}
      />
    </section>
  );
}
