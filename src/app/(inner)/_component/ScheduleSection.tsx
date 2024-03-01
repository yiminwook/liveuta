'use client';
import { SCROLL_PER_YOUTUBE_CARD } from '@/const';
import { ContentsDataType } from '@/type/api/mongoDB';
import { useSelectedScheduleAtom } from '@inner/_lib/atom';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import InterSectionTrigger from './InterSectionTrigger';
import ScheduleCard from './scheduleCard/Card';
import * as cardStyles from './scheduleCard/card.css';

const CardPlaceHolders = dynamic(() => import('./scheduleCard/CardPlaceHolders'), { ssr: false });

export default function ScheduleSection() {
  const [loadContents, setLoadContents] = useState<ContentsDataType[]>([]);
  const [scrollPage, setScrollPage] = useState(1);
  const [selectedData] = useSelectedScheduleAtom();

  const isDone = loadContents.length >= selectedData.contents.length;

  const handleInfinityScroll = () => {
    if (isDone) return;
    setScrollPage((pre) => pre + 1);
  };

  useEffect(() => {
    // 페이지가 바뀌면 데이터 추가로 로드
    if (isDone) return;
    const nextContents = selectedData.contents.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...nextContents]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPage]);

  useEffect(() => {
    // 스케쥴 데이터가 바뀌면 리셋
    const resetContent = selectedData.contents.slice(0, SCROLL_PER_YOUTUBE_CARD);
    setScrollPage(() => 1);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  return (
    <section>
      <div className={cardStyles.cardList}>
        {loadContents.map((data, index) => (
          <ScheduleCard key={data.videoId} content={data} index={index} />
        ))}
        <CardPlaceHolders />
      </div>
      {loadContents.length > 0 && (
        <InterSectionTrigger isDone={isDone} onShow={handleInfinityScroll} />
      )}
    </section>
  );
}
