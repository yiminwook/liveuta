import { Session } from '@/type/api/session';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const REDIRECT_URL = process.env.NEXT_PUBLIC_SITE_URL + '/api/auth/google/callback';

/** google cloud console */
export const jwtAuth = new google.auth.JWT({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
});

export const getSession = async (refreshToken: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/auth/session', {
    headers: {
      token: refreshToken,
    },
  });

  const data: {
    session: null | Session;
    message?: string;
  } = await response.json();

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};

export const getSessionInServer = async () => {
  const cookieStore = cookies();
  try {
    const refreshToken = cookieStore.get('refresh_token')?.value;
    if (!refreshToken) return null;
    const response = await getSession(refreshToken);
    console.log('response', response);
    return response.session;
  } catch (error) {
    console.error('getSessionInServer', error);
    redirect('/sessionout');
  }
};
