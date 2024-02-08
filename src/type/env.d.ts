import '@types/node/process';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly TZ?: string;
      readonly NEXT_PUBLIC_SITE_URL: string;
      readonly NEXT_PUBLIC_REQUEST_URL: string;

      readonly GOOGLE_API_KEY: string;
      // readonly GOOGLE_CLIENT_ID: string;
      // readonly GOOGLE_SECRET_KEY: string;

      readonly FIREBASE_PROJECT_ID: string;
      readonly FIREBASE_PRIVATE_KEY: string;
      readonly FIREBASE_CLIENT_EMAIL: string;
      readonly NEXT_PUBLIC_FIREBASE_VAPID_KEY: string;

      readonly MONGODB_SCHEDULE_COLLECTION: string;
      readonly MONGODB_NOTI_COLLECTION: string;
      readonly MONGODB_SCHEDULE_DB: string;
      readonly MONGODB_API_KEY: string;

      readonly CONTENTS_SHEET_RANGE: string;
      readonly CHANNELS_SHEET_RANGE: string;
      readonly PUSH_SHEET_RANGE: string;

      readonly CONTENTS_SHEET_ID: string;
      readonly CHANNELS_SHEET_ID: string;
      readonly PUSH_SHEET_ID: string;

      /** 미사용 */
      readonly HOLODEX_API_KEY: string;
    }
  }
}
