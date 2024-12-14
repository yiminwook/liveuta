import { Payload } from '@/types/nextAuth';
import Discord, { DiscordProfile } from '@auth/core/providers/discord';
import jwt from 'jsonwebtoken';
import NextAuth, { Session } from 'next-auth';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import kakao, { KakaoProfile } from 'next-auth/providers/kakao';
import { getUserInfo, login } from '../oracleDB/auth/service';

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

export const { handlers, auth, signIn } = NextAuth({
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
      authorization: 'https://kauth.kakao.com/oauth/authorize?scope&prompt=select_account',
    }),
    Discord<DiscordProfile>({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+email&prompt=select_account',
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
    async signOut() {},
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const email = user.email;
        const provider = account?.provider;
        if (!email) throw new Error('email is required');
        if (!provider) throw new Error('provider is required');

        await login({ email, provider });

        return true;
      } catch (error) {
        console.error('callbackSignIn', error);
        const message = error instanceof Error ? error.message : 'unknown error';
        return `/error?error=${encodeURIComponent(message)}`;
      }
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        //첫 로그인, user는 첫 로그인시만 들어온다.
        token.user = {
          email: user.email!,
          name: user.name,
          image: user.image,
          provider: account.provider!,
          userLv: 0,
          loginAt: '',
          accessToken: '',
        };
      }

      const userInfo = await getUserInfo({
        email: token.user.email,
        provider: token.user.provider,
      });
      token.user.userLv = userInfo.lv;
      token.user.loginAt = userInfo.loginAt.toISOString();
      const threeDays = 60 * 60 * 24 * 3;

      const payload: Payload = {
        id: userInfo.id,
        userLv: token.user.userLv,
        email: token.user.email,
        name: token.user.name,
        image: token.user.image,
        loginAt: token.user.loginAt,
        provider: token.user.provider,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: threeDays });
      token.user.accessToken = accessToken;
      return token;
    },
    async session({ session: _session, token }) {
      const session = _session as Session;
      if (!session) return session;
      session.user = { ...token.user };
      return session;
    },
  },
});
