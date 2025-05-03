import { SCROLL_PER_YOUTUBE_CARD } from '@/constants';
import { TParsedClientContent } from '@/libraries/mongodb/type';
import { waitfor } from '@/utils/helper';
import { useMemo, useState } from 'react';

type UseInfiniteScheduleDataArgs = {
  rawData: TParsedClientContent[];
};

const useInfiniteScheduleData = ({ rawData }: UseInfiniteScheduleDataArgs) => {
  const [scrollPage, setScrollPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const maxPage = Math.ceil(rawData.length / SCROLL_PER_YOUTUBE_CARD);
  const isDone = scrollPage >= maxPage;

  const handleInfinityScroll = async () => {
    if (isLoading || isDone) return;
    setIsLoading(() => true);

    await waitfor(500); // 성능 최적화를 위한 딜레이

    setScrollPage((pre) => pre + 1);
    setIsLoading(() => false);
  };

  const loadContents = useMemo(
    () => rawData.slice(0, SCROLL_PER_YOUTUBE_CARD * scrollPage),
    [rawData, scrollPage],
  );

  return {
    handleInfinityScroll,
    loadContents,
    isLoading,
  };
};

export default useInfiniteScheduleData;
