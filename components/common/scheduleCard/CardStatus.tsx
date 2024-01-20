import { isStream } from '@/types/inSheet';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { StatusBox } from '@/components/common/scheduleCard/Style';

interface CardStatusProps {
  isStream: isStream;
  interval: string;
  videoId: string;
}

const CardStatus = ({ isStream, interval, videoId }: CardStatusProps) => {
  const [viewCount, setViewCount] = useState('?');

  const getViewCount = async () => {
    try {
      if (isStream !== 'TRUE') return;
      const res = await axios.get(`/api/crawler?id=${videoId}`);
      const data = res.data.data;
      setViewCount(() => data);
    } catch (error) {}
  };

  useEffect(() => {
    getViewCount();
  }, []);

  if (isStream !== 'TRUE') {
    return <StatusBox>{interval}</StatusBox>;
  }

  return (
    <StatusBox>
      <FaUsers size={'0.7rem'} />
      {viewCount}
    </StatusBox>
  );
};

export default CardStatus;
