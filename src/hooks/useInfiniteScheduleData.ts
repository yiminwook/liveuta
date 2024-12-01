import { TContentsData } from '@/types/api/mongoDB';
import { useEffect, useState } from 'react';
import { SCROLL_PER_YOUTUBE_CARD } from '@/constants';
import { waitfor } from '@/utils/helper';

type UseInfiniteScheduleDataArgs = {
  rawData: TContentsData[];
};

const useInfiniteScheduleData = ({ rawData }: UseInfiniteScheduleDataArgs) => {
  const [loadContents, setLoadContents] = useState<TContentsData[]>([]);
  const [scrollPage, setScrollPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isDone = loadContents.length >= rawData.length;

  const handleInfinityScroll = async () => {
    if (isLoading || isDone) return;
    setIsLoading(() => true);

    await waitfor(500); // 성능 최적화를 위한 딜레이

    setScrollPage((pre) => pre + 1);
    setIsLoading(() => false);
  };

  useEffect(() => {
    // 페이지가 바뀌면 데이터 추가로 로드
    if (isDone) return;

    const nextContents = rawData.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => nextContents);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPage]);

  useEffect(() => {
    // 스케쥴 데이터가 바뀌면 최신화
    const resetContent = rawData.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage);
    setLoadContents(() => [...resetContent]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  // useEffect(() => {
  //   // 필터가 바뀌면 페이지를 리셋
  //   const resetContent = rawData.slice(0, SCROLL_PER_YOUTUBE_CARD);
  //   setScrollPage(() => 1);
  //   setLoadContents(() => [...resetContent]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter]);

  return {
    handleInfinityScroll,
    loadContents,
    isLoading,
  };
};

export default useInfiniteScheduleData;
