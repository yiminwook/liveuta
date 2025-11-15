import 'server-only';
import { google } from 'googleapis';

export const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
export const GOOGLE_REDIRECT_URL = process.env.NEXT_PUBLIC_SITE_URL + '/api/auth/callback/google';

/** google cloud console */
export const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_REDIRECT_URL,
});
