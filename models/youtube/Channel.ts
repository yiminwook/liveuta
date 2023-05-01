import { GOOGLE_API_KEY } from '@/consts';
import getENV from '@/utils/GetENV';
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
