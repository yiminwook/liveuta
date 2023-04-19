export const getinterval = (nowTimeStamp: number, scheduledTimeStamp: number): string => {
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

/** 유닉스 시간을 반환
 *
 *  서버에서 사용
 *
 *  Localtime default utc+9
 */
export const getNow = (isLocalTime: boolean) => {
  if (isLocalTime) {
    return Date.now() + +(process.env.local_time ?? 32400000);
  } else {
    return Date.now();
  }
};
