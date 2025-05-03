import dayjs from '@/libraries/dayjs';
import { HMS } from '@/types/time';

type TranslateFunction = (key: string, options?: { count: number }) => string;

export const getInterval = (scheduledTimeStamp: Date, t: TranslateFunction): string => {
  const utcTime = dayjs(scheduledTimeStamp);
  const nowTimeStamp = dayjs();

  /** 분 */
  const interval = utcTime.diff(nowTimeStamp, 'minute');

  if (interval < 0) {
    return '';
  }

  if (interval < 60) {
    return t('time.intervalMinutes', { count: Math.trunc(interval) });
  }

  if (interval >= 60) {
    return t('time.intervalHours', { count: Math.trunc(interval / 60) });
  }

  return '';
};

export const stringToTime = (time: dayjs.Dayjs) => {
  const timestamp = time.valueOf();
  const utcTime = time.toDate();
  return { timestamp, utcTime };
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

export const convertTimeToSec = (timeString: string) => {
  const timeParts = timeString.split(':');

  let seconds = 0;

  if (timeParts.length === 3) {
    seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
  } else if (timeParts.length === 2) {
    seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
  } else if (timeParts.length === 1) {
    seconds = parseInt(timeParts[0]);
  }

  return seconds;
};
