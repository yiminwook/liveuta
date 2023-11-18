'use client';
import { FaUsers } from 'react-icons/fa';
import { isStream } from '@/types/inSheet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';

interface ScheduleStatusProps {
  isStream: isStream;
  interval: string;
  videoId: string;
}

const ScheduleStatus = ({ isStream, interval, videoId }: ScheduleStatusProps) => {
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
    return <div className={scheduleCard['status']}>{interval}</div>;
  }

  return (
    <div className={scheduleCard['status']}>
      <FaUsers size={'0.7rem'} />
      {viewCount}
    </div>
  );
};

export default ScheduleStatus;
