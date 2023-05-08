import {
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY,
  REDIRECT_URL as REDIRECT_URL,
  REFRESH_SECRET,
} from '@/consts';
import getENV from '@/utils/getENV';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export class GoogleClient {
  private static instance: OAuth2Client;

  public static getInstance(): OAuth2Client {
    if (GoogleClient.instance === undefined || GoogleClient.instance === null) {
      console.log('google OAuth2Client start');
      const client = new google.auth.OAuth2({
        clientId: getENV(GOOGLE_CLIENT_ID),
        clientSecret: getENV(GOOGLE_SECRET_KEY),
        redirectUri: getENV(REDIRECT_URL),
      });
      client.apiKey = getENV(GOOGLE_API_KEY);
      GoogleClient.instance = client;
    }

    return GoogleClient.instance;
  }
}

interface tokenAPIResponseType {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}
export const getAccesTokenByRefeshToken = async (req: NextApiRequest) => {
  const { refreshCookie } = req.cookies;
  if (!refreshCookie) throw new Error('Fail to get RefreshCookie');
  const decodeRefreshToken = jwt.verify(refreshCookie, getENV(REFRESH_SECRET));
  const response = await axios.post<tokenAPIResponseType>('https://www.googleapis.com/oauth2/v4/token', {
    client_id: getENV(GOOGLE_CLIENT_ID),
    client_secret: getENV(GOOGLE_SECRET_KEY),
    refresh_token: decodeRefreshToken,
    grant_type: 'refresh_token',
  });

  return response.data.access_token;
};
