import dayjs from '@/model/dayjs';

export const getInterval = (scheduledTimeStamp: number): string => {
  const nowTimeStamp = dayjs.tz().valueOf();

  /** 분 */
  const interval = Math.trunc((scheduledTimeStamp - nowTimeStamp) / (1000 * 60));
  if (interval < 0) {
    return '';
  }

  if (interval >= 0 && interval < 60) {
    return `${Math.trunc(interval)}분 후`;
  }

  if (interval > 60) {
    return `${Math.trunc(interval / 60)}시간 후`;
  }

  return '';
};

export const stringToTime = (time: dayjs.Dayjs) => {
  const timestamp = time.valueOf();
  const korTime = time.format('M월 DD일 (ddd) A hh:mm');

  return { timestamp, korTime };
};
