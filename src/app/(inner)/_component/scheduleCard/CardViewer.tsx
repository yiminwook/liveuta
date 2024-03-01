import { useQuery } from '@tanstack/react-query';
import { FaUsers } from 'react-icons/fa';
import * as styles from './card.css';
import { getViewer } from '@inner/_lib/getViewer';

interface CardViewerProps {
  videoId: string;
}

export default function CardViewer({ videoId }: CardViewerProps) {
  const { data } = useQuery({
    queryKey: ['viewCount', videoId, 'ignore'],
    queryFn: () => getViewer(videoId),
    // vercel 사용량 과다 방지, 5분 간격으로 새로요청
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
    retryDelay(failureCount, error) {
      // 10초 간격으로 재시도
      return failureCount * 1000 * 10;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    placeholderData: '?',
  });

  return (
    <>
      <FaUsers className={styles.statusSvg} size={'0.75rem'} />
      {data}
    </>
  );
}
