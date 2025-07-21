import 'server-only';
import { google } from 'googleapis';

export const youtubeService = google.youtube('v3');

// const fetcher = (input: any) => fetch(input, { next: { revalidate: 1800, tags: [CHANNELS_TAG] } });

export const getYoutubeChannelsByUid = async (uid: string) => {
  const response = await youtubeService.channels.list(
    {
      id: [uid],
      part: ['id', 'snippet', 'statistics'],
      key: process.env.GOOGLE_API_KEY,
    },
    // { fetchImplementation: fetcher },
  );

  return response.data;
};

/** 조회시 순서가 뒤섞임 */
export const getYoutubeChannels = async (idArr: string[]) => {
  const response = await youtubeService.channels.list(
    {
      id: idArr,
      part: ['id', 'snippet', 'statistics'],
      key: process.env.GOOGLE_API_KEY,
    },
    // { fetchImplementation: fetcher },
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
    // { fetchImplementation: fetcher },
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
    // { fetchImplementation: fetcher },
  );

  return response.data.items?.[0] || null;
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q={custom_username}&key={api_key}'

export const getYoutubeChannelByHandle = async (handle: string) => {
  const response = await youtubeService.channels.list(
    {
      forHandle: handle,
      part: ['id', 'snippet', 'statistics'],
      key: process.env.GOOGLE_API_KEY,
    },
    // { fetchImplementation: fetcher },
  );

  return response.data.items?.[0] || null;
};
