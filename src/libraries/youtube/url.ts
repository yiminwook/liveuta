export const generateVideoUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const generateChannelUrl = (channelId: string) => {
  return `https://www.youtube.com/channel/${channelId}`;
};
