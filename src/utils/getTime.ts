import dayjs from '@/libraries/dayjs';
import { HMS } from '@/types/time';

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

export const secondsToHMS = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return { h, m, s };
};

export const hmsToSeconds = (hms: HMS) => {
  return hms.h * 3600 + hms.m * 60 + hms.s;
};

export function hmsToString(hms: HMS) {
  const formattedHour = hms.h === 0 ? '' : `${hms.h}:`.padStart(3, '0');
  const formattedMinute = `${hms.m}`.padStart(2, '0');
  const formattedSecond = `${hms.s}`.padStart(2, '0');

  return `${formattedHour}${formattedMinute}:${formattedSecond}`;
}
