import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import * as styles from './card.css';

interface CardViewerProps {
  videoId: string;
}

export default function CardViewer({ videoId }: CardViewerProps) {
  const { data } = useQuery({
    queryKey: ['viewCount', videoId, 'ignore'],
    queryFn: async () => {
      const res = await axios.get<{ data: string }>(`/api/crawler?id=${videoId}`);
      const data = res.data.data;
      return data;
    },
    refetchInterval: 1000 * 60 * 3,
    retry: 5,
    retryDelay(failureCount, error) {
      return failureCount * 3000;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 3,
    placeholderData: '?',
  });

  return (
    <>
      <FaUsers className={styles.statusSvg} size={'0.75rem'} />
      {data}
    </>
  );
}
