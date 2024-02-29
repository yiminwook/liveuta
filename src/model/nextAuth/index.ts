import Discord, { DiscordProfile } from '@auth/core/providers/discord';
import NextAuth from 'next-auth';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import kakao, { KakaoProfile } from 'next-auth/providers/kakao';
import { callbackJwt, callbackSession, callbackSignIn } from './callbacks';
import { signOut } from './events';

// 애플 개발자 계정이 없음..
// const key = process.env.APPLE_KEY_SECRET!.replaceAll(/\\n/g, "\n");
// const generateAppleToken = () => {
//   const today = dayjs.tz();
//   // https://support.cafe24.com/hc/ko/articles/8467351594649
//   // https://gist.github.com/balazsorban44/09613175e7b37ec03f676dcefb7be5eb
//   // https://developer.apple.com/documentation/accountorganizationaldatasharing/creating-a-client-secret
//   const appleToken = jsonwebtoken.sign(
//     {
//       aud: "https://appleid.apple.com",
//       iss: process.env.APPLE_TEAM_ID,
//       sub: process.env.APPLE_SERVICE_ID,
//       iat: today.unix(),
//       exp: today.add(1, "months").unix(),
//     },
//     createPrivateKey(key),
//     {
//       algorithm: "ES256",
//       keyid: process.env.APPLE_KEY_ID,
//     }
//   );
//   return appleToken;
// };

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/error',
  },
  providers: [
    Google<GoogleProfile>({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    kakao<KakaoProfile>({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    Discord<DiscordProfile>({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    // expires_in 타입에러, next-auth에서 지원하지 않음
    // naver<NaverProfile>({
    //   clientId: process.env.NAVER_CLIENT_ID,
    //   clientSecret: process.env.NAVER_CLIENT_SECRET,
    // }),
    // Github({
    //   // 깃허브는 개발환경에서 로그인이 안됌
    //   // 로그아웃시에는 깃허브로 가서 로그아웃 해야함
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: 'select_account',
    //     },
    //   },
    // }),
  ],
  events: {
    signOut,
  },
  callbacks: {
    signIn: callbackSignIn,
    jwt: callbackJwt,
    session: callbackSession,
  },
});
