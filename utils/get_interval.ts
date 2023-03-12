const getinterval = (
  nowTimeStamp: number,
  scheduledTimeStamp: number
): string => {
  /** 분 */
  const interval = Math.trunc(
    (scheduledTimeStamp - nowTimeStamp) / (1000 * 60)
  );
  if (interval < 0) {
    return "";
  }

  if (interval >= 0 && interval < 60) {
    return `${Math.trunc(interval)}분 남음`;
  }

  if (interval > 60) {
    return `${Math.trunc(interval / 60)}시간 남음`;
  }

  return "";
};

export default getinterval;
