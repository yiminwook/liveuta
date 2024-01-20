'use client';
import { FaUsers } from 'react-icons/fa';
import { isStream } from '@/types/inSheet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/var';

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 0.125rem;
  color: ${COLORS['highlight-font']};
  vertical-align: middle;
`;
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
    return <StatusBox>{interval}</StatusBox>;
  }

  return (
    <StatusBox>
      <FaUsers size={'0.7rem'} />
      {viewCount}
    </StatusBox>
  );
};

export default ScheduleStatus;
