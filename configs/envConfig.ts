import getEnv from '@/utils/getEnv';

export const serverEnvConfig = () => {
  const GOOGLE_API_KEY = '';
  const HOLODEX_API_KEY = '';
  const CONTENTS_SHEET_ID = '';
  const CHANNELS_SHEET_ID = '';
  const PUSH_SHEET_ID = '';
  const CONTENTS_SHEET_RANGE = '';
  const CHANNELS_SHEET_RANGE = '';
  const PUSH_SHEET_RANGE = '';
  const SHORT_URL = '';
  const REQUEST_URL = '';
  const FIREBASE_PROJECT_ID = '';
  const FIREBASE_CLIENT_EMAIL = '';
  const FIREBASE_PRIVATE_KEY = '';

  return {
    GOOGLE_API_KEY,
    CONTENTS_SHEET_ID,
    CONTENTS_SHEET_RANGE,
    CHANNELS_SHEET_ID,
    CHANNELS_SHEET_RANGE,
    PUSH_SHEET_ID,
    PUSH_SHEET_RANGE,
    SHORT_URL,
    REQUEST_URL,
    HOLODEX_API_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  };
};

export const publicEnvConfig = () => {
  const NEXT_PUBLIC_SITE_URL = '';

  return { NEXT_PUBLIC_SITE_URL };
};
