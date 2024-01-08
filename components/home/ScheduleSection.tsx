import { ContentsDataType } from '@/types/inSheet';
import ScheduleCard from '@/app/test/Card';
import { useEffect, useMemo, useState } from 'react';
import { SCROLL_PER_YOUTUBE_CARD } from '@/consts';
import styled from '@emotion/styled';

const Section = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem;
  gap: 0.2rem;
`;

const Card = styled.div``;

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
    <Section>
      {loadContents.map((data, index) => (
        <ScheduleCard
          key={data.videoId}
          content={data}
          currentIndex={index}
          lastContentsIndex={loadContents.length - 1}
          handleInfinityScroll={handleInfinityScroll}
        />
      ))}
    </Section>
  );
};

export default ScheduleSection;
