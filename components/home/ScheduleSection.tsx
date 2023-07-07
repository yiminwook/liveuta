import { ContentsDataType } from '@/types/inSheet';
import home from '@/components/home/Home.module.scss';
import ScheduleCard from '@/components/common/scheduleCard/ScheduleCard';
import { useEffect, useMemo, useState } from 'react';
import { SCROLL_PER_YOUTUBE_CARD } from '@/consts';

interface YoutubeSectionProps {
  contents: ContentsDataType[];
}

const ScheduleSection = ({ contents }: YoutubeSectionProps) => {
  const [loadContents, setLoadContents] = useState(contents.slice(0, SCROLL_PER_YOUTUBE_CARD));
  const [scrollPage, setScrollPage] = useState(1);

  const maxPage = useMemo(() => {
    return Math.ceil(contents.length / SCROLL_PER_YOUTUBE_CARD);
  }, [contents]);

  const handleInfinityScroll = () => {
    if (scrollPage < 1 || scrollPage > maxPage) return;
    if (loadContents.length >= contents.length) return;
    setScrollPage((pre) => pre + 1);
  };

  useEffect(() => {
    //필터 이동시 리셋
    setScrollPage(() => 1);
    setLoadContents(() => contents.slice(0, SCROLL_PER_YOUTUBE_CARD));
  }, [contents]);

  useEffect(() => {
    if (scrollPage <= 1 || scrollPage > maxPage) return;
    if (loadContents.length >= contents.length) return;
    const nextContents = contents.slice(loadContents.length, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents((pre) => [...pre, ...nextContents]);
  }, [scrollPage]);

  return (
    <section className={home['contents-section']}>
      {loadContents.map((data, index) => (
        <ScheduleCard
          key={data.videoId}
          content={data}
          currentIndex={index}
          lastContentsIndex={loadContents.length - 1}
          handleInfinityScroll={handleInfinityScroll}
        />
      ))}
    </section>
  );
};

export default ScheduleSection;
