'use client';
import { SCROLL_PER_YOUTUBE_CARD } from '@/const';
import { ContentsDataType } from '@/type/api/mongoDB';
import dynamic from 'next/dynamic';
import { use, useEffect, useState } from 'react';
import InterSectionTrigger from './InterSectionTrigger';
import ScheduleCard from './scheduleCard/Card';
import * as cardStyles from './scheduleCard/card.css';
import { useAtom } from 'jotai';
import { schedule } from '@inner/_lib/atom';
import { Session } from 'next-auth';

const CardPlaceHolders = dynamic(() => import('./scheduleCard/CardPlaceHolders'), { ssr: false });

type ScheduleSectionProps = {
  session: Session | null;
};

export default function ScheduleSection({ session }: ScheduleSectionProps) {
  const [loadContents, setLoadContents] = useState<ContentsDataType[]>([]);
  const [scrollPage, setScrollPage] = useState(1);
  const [selectedData] = useAtom(schedule.selectedScheduleAtom);
  const [filter] = useAtom(schedule.filterAtom);

  const isDone = loadContents.length >= selectedData.content.length;

  const handleInfinityScroll = () => {
    if (isDone) return;
    setScrollPage((pre) => pre + 1);
  };

  useEffect(() => {
    // 페이지가 바뀌면 데이터 추가로 로드
    if (isDone) return;
    const nextContents = selectedData.content.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...nextContents]);
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

  return (
    <section>
      <div className={cardStyles.cardList}>
        {loadContents.map((data, index) => (
          <ScheduleCard
            session={session}
            key={`scheduleCard_${data.videoId}`}
            content={data}
            index={index}
          />
        ))}
        <CardPlaceHolders />
      </div>
      {loadContents.length > 0 && (
        <InterSectionTrigger isDone={isDone} onShow={handleInfinityScroll} />
      )}
    </section>
  );
}
