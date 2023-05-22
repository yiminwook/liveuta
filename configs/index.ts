import getEnv from '@/utils/getEnv';

export const serverEnvConfig = () => {
  const SITE_URL = getEnv('SITE_URL');
  const GOOGLE_API_KEY = getEnv('GOOGLE_API_KEY');
  const CONTENTS_SHEET_ID = getEnv('CONTENTS_SHEET_ID');
  const CONTENTS_SHEET_RANGE = getEnv('CONTENTS_SHEET_RANGE');
  const CHANNELS_SHEET_ID = getEnv('CHANNELS_SHEET_ID');
  const CHANNELS_SHEET_RANGE = getEnv('CHANNELS_SHEET_RANGE');
  const SHORT_URL = getEnv('SHORT_URL');
  const REQUEST_URL = getEnv('REQUEST_URL');
  const LOCAL_TIME = getEnv('LOCAL_TIME');
  // const INTERVAL_TIME = getENV('INTERVAL_TIME');

  return {
    SITE_URL,
    GOOGLE_API_KEY,
    CONTENTS_SHEET_ID,
    CONTENTS_SHEET_RANGE,
    CHANNELS_SHEET_ID,
    CHANNELS_SHEET_RANGE,
    SHORT_URL,
    REQUEST_URL,
    LOCAL_TIME,
  };
};
