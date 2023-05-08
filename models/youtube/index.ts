import { GOOGLE_API_KEY } from '@/consts';
import getENV from '@/utils/getENV';
import { google } from 'googleapis';

export const youtubeService = google.youtube('v3');

export const getYoutubeChannelsByUid = async (uid: string) => {
  const key = getENV(GOOGLE_API_KEY);

  const response = await youtubeService.channels.list({
    id: [uid],
    part: ['id', 'snippet', 'statistics'],
    key,
  });

  return response.data;
};

export const getYoutubeChannels = async (idArr: string[]) => {
  const key = getENV(GOOGLE_API_KEY);
  const response = await youtubeService.channels.list({
    id: idArr,
    part: ['id', 'snippet', 'statistics'],
    key,
  });

  return response.data;
};

export const searchYoutubeChannels = async (channelName: string) => {
  const key = getENV(GOOGLE_API_KEY);
  const response = await youtubeService.search.list({
    part: ['id', 'snippet', 'statistics'],
    q: channelName,
    type: ['channel'],
    key,
  });

  return response.data;
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q={custom_username}&key={api_key}'
