import { google } from 'googleapis';
import { customFetchNoCached } from '@/libraries/customFetch';

export const youtubeService = google.youtube('v3');

export const getYoutubeChannelsByUid = async (uid: string) => {
  const response = await youtubeService.channels.list(
    {
      id: [uid],
      part: ['id', 'snippet', 'statistics'],
      key: process.env.GOOGLE_API_KEY,
    },
    { fetchImplementation: customFetchNoCached },
  );

  return response.data;
};

export const getYoutubeChannels = async (idArr: string[]) => {
  const response = await youtubeService.channels.list(
    {
      id: idArr,
      part: ['id', 'snippet', 'statistics'],
      key: process.env.GOOGLE_API_KEY,
    },
    { fetchImplementation: customFetchNoCached },
  );

  return response.data;
};

// 맞춤채널 url로 검색
export const searchYoutubeChannels = async (channelName: string) => {
  const response = await youtubeService.search.list(
    {
      part: ['id', 'snippet', 'statistics'],
      q: channelName,
      type: ['channel'],
      key: process.env.GOOGLE_API_KEY,
    },
    { fetchImplementation: customFetchNoCached },
  );

  return response.data;
};

export const getYoutubeChannelsByVideoId = async (videoId: string) => {
  const response = await youtubeService.videos.list(
    {
      part: ['id', 'snippet', 'statistics'],
      id: [videoId],
      key: process.env.GOOGLE_API_KEY,
    },
    { fetchImplementation: customFetchNoCached },
  );
  return response.data.items?.[0] || null;
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q={custom_username}&key={api_key}'
