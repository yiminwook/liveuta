import getENV from '@/utils/GetENV';

export const getInterval = (scheduledTimeStamp: number): string => {
  const nowTimeStamp = getNow(true);

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

const now = new Date();

/** 유닉스 시간을 반환
 *
 *  서버에서 사용
 *
 *  Localtime default utc+9
 */
export const getNow = (isLocalTime: boolean) => {
  if (isLocalTime) {
    const localTime = getENV('LOCAL_TIME');
    return now.getTime() + +(localTime ?? 32400000);
  } else {
    return now.getTime();
  }
};

/**
 * ISO 8601 -
 * EX: "2016-03-29T06:54:53Z"
 */
export const stringToTime = (stringTime: string) => {
  const time = new Date(stringTime);
  const timestamp = time.getTime();
  const korTime = time.toLocaleString('ko-kr', {
    // year: "numeric",
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });
  return { timestamp, korTime };
};
