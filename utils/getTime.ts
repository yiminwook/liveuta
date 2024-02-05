import dayjs from '@/models/dayjs';

export const getInterval = (scheduledTimeStamp: number): string => {
  const nowTimeStamp = dayjs().valueOf();

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

/**
 * ISO 8601 -
 * EX: "2016-03-29T06:54:53Z"
 */
export const stringToTime = (stringTime: string) => {
  console.log(stringTime);
  const time = dayjs(stringTime);
  const timestamp = time.valueOf();
  const korTime = time.format('M월 DD일 (ddd) A hh:mm');

  return { timestamp, korTime };
};
