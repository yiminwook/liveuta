import { GOOGLE_API_KEY } from '@/consts';
import getENV from '@/utils/GetENV';
import { google } from 'googleapis';

export const youtubeService = google.youtube('v3');

export const getYoutubeChannels = async (id: string) => {
  const key = getENV(GOOGLE_API_KEY);

  const response = await youtubeService.channels.list({
    id: [id],
    part: ['id', 'snippet', 'statistics'],
    key,
  });

  return response.data;
};
