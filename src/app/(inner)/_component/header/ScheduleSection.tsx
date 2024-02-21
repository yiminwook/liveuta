'use client';
import { SCROLL_PER_YOUTUBE_CARD } from '@/const';
import { ContentsDataType } from '@/type/api/mongoDB';
import { useEffect, useState } from 'react';
import ScheduleCard from '../scheduleCard/Card';
import CardPlaceHolders from '../scheduleCard/CardPlaceHolders';
import * as cardStyles from '../scheduleCard/card.css';
import InterSectionTrigger from '../InterSectionTrigger';

interface YoutubeSectionProps {
  contents: ContentsDataType[];
  isMobile: boolean;
}

export default function ScheduleSection({ contents, isMobile }: YoutubeSectionProps) {
  const [loadContents, setLoadContents] = useState(contents.slice(0, SCROLL_PER_YOUTUBE_CARD));
  const [scrollPage, setScrollPage] = useState(1);

  const isDone = loadContents.length >= contents.length;

  const handleInfinityScroll = () => {
    if (isDone) return;
    setScrollPage((pre) => pre + 1);
  };

  useEffect(() => {
    //필터 이동시 리셋
    setScrollPage(() => 1);
    setLoadContents(() => contents.slice(0, SCROLL_PER_YOUTUBE_CARD));
  }, [contents]);

  useEffect(() => {
    if (isDone) return;
    const nextContents = contents.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...nextContents]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPage]);

  return (
    <section>
      <div className={cardStyles.cardList}>
        {loadContents.map((data, index) => (
          <ScheduleCard key={data.videoId} content={data} currentIndex={index} />
        ))}
        <CardPlaceHolders isMobile={isMobile} />
      </div>
      {loadContents.length > 0 && (
        <InterSectionTrigger isDone={isDone} onShow={handleInfinityScroll} />
      )}
    </section>
  );
}
