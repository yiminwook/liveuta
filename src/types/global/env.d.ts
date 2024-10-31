declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly TZ?: string;
      readonly NEXTAUTH_SECRET: string;
      readonly ACCESS_SECRET: string;

      //vercel env  - https://vercel.com/docs/projects/environment-variables/system-environment-variables
      readonly NEXT_PUBLIC_VERCEL_ENV: 'production' | 'preview' | 'development';
      readonly NEXT_PUBLIC_VERCEL_URL: string; // *.vercel.app
      readonly NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string; // main or dev

      readonly NEXT_PUBLIC_SITE_URL: string;
      readonly NEXT_PUBLIC_REQUEST_URL: string;

      readonly GOOGLE_API_KEY: string;
      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
      // readonly NAVER_CLIENT_ID: string;
      // readonly NAVER_CLIENT_SECRET: string;
      readonly KAKAO_CLIENT_ID: string;
      readonly KAKAO_CLIENT_SECRET: string;

      readonly FIREBASE_PROJECT_ID: string;
      readonly FIREBASE_PRIVATE_KEY: string;
      readonly FIREBASE_CLIENT_EMAIL: string;
      readonly NEXT_PUBLIC_FIREBASE_VAPID_KEY: string;

      readonly MONGODB_URI: string;
      readonly MONGODB_API_KEY: string;

      readonly ORACLEDB_CONNECTSTRING: string;
      readonly ORACLEDB_PASSWORD: string;

      /** 폐기 */
      // readonly GOOGLE_CLIENT_ID: string;
      // readonly GOOGLE_SECRET_KEY: string;

      // readonly CONTENTS_SHEET_RANGE: string;
      // readonly CHANNELS_SHEET_RANGE: string;
      // readonly PUSH_SHEET_RANGE: string;

      // readonly CONTENTS_SHEET_ID: string;
      // readonly CHANNELS_SHEET_ID: string;
      // readonly PUSH_SHEET_ID: string;

      /** 미사용 */
      readonly HOLODEX_API_KEY: string;
    }
  }
}

export {};
