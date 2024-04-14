export const checkVideoId = (videoId: string | null) => {
  if (typeof videoId !== 'string') throw new Error('올바르지 않은 ID입니다.');
  return videoId;
};
