import { Provider } from '@/types/next-auth';
import Discord, { DiscordProfile } from '@auth/core/providers/discord';
import jwt from 'jsonwebtoken';
import NextAuth, { User } from 'next-auth';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import kakao, { KakaoProfile } from 'next-auth/providers/kakao';
import { loginAndFindone } from '../oracledb/auth/service';

const generateErrorObj = (provider: Provider, error: unknown): User => ({
  userId: -1,
  userLv: -1,
  email: 'error',
  name: 'error',
  image: '',
  loginAt: '',
  provider,
  errorMessage: error instanceof Error ? error.message : 'unknown error',
});

const generateDiscordImageUrl = (profile: DiscordProfile) => {
  if (profile.avatar === null) {
    const defaultAvatarNumber =
      profile.discriminator === '0'
        ? Number(BigInt(profile.id) >> BigInt(22)) % 6
        : parseInt(profile.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  } else {
    const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
  }
};

// 애플 개발자 계정이 없음..
// const key = process.env.APPLE_KEY_SECRET!.replaceAll(/\\n/g, "\n");π
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
      async profile(profile, _tokens) {
        try {
          const provider = 'google';
          const email = profile.email;
          const name = profile.name;
          const image = profile.picture;

          const userInfo = await loginAndFindone({
            email,
            provider,
          });

          const payload: User = {
            email,
            name,
            image,
            userId: userInfo.id,
            userLv: userInfo.lv,
            loginAt: userInfo.loginAt.toISOString(),
            provider,
          };

          return payload;
        } catch (e) {
          return generateErrorObj('google', e);
        }
      },
    }),
    kakao<KakaoProfile>({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorization: 'https://kauth.kakao.com/oauth/authorize?scope&prompt=select_account',
      async profile(profile, _tokens) {
        try {
          const provider = 'kakao';
          const id = profile.id.toString();
          const email = profile.kakao_account?.email;
          const image = profile.kakao_account?.profile?.profile_image_url;
          const name = profile.kakao_account?.profile?.nickname;

          if (!email) throw new Error('email is undefined');

          const userInfo = await loginAndFindone({
            email,
            provider,
          });

          const payload: User = {
            id, //nextAuth에서 type를 강제함. 필수
            email,
            name,
            image,
            userId: userInfo.id,
            userLv: userInfo.lv,
            loginAt: userInfo.loginAt.toISOString(),
            provider,
          };

          return payload;
        } catch (e) {
          return generateErrorObj('kakao', e);
        }
      },
    }),
    Discord<DiscordProfile>({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+email&prompt=select_account',
      async profile(profile, _tokens) {
        try {
          const provider = 'discord';
          const id = profile.id;
          const email = profile.email;
          const name = profile.global_name ?? profile.username;
          const image = generateDiscordImageUrl(profile);

          if (!email) throw new Error('email is undefined');

          const userInfo = await loginAndFindone({
            email,
            provider,
          });

          const payload: User = {
            id,
            email,
            image,
            name,
            userId: userInfo.id,
            userLv: userInfo.lv,
            loginAt: userInfo.loginAt.toISOString(),
            provider,
          };

          return payload;
        } catch (e) {
          return generateErrorObj('discord', e);
        }
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
    async signOut() {},
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const email = user.email;
        if (!email) throw new Error('email is required');
        if (user.errorMessage) throw new Error(user.errorMessage);
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';
        return `/error?error=${encodeURIComponent(message)}`;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        //첫 로그인, user는 첫 로그인시만 들어온다.
        token.user = { ...user, email: user.email! };
      }
      return token;
    },
    async session({ session, token }) {
      if (!session) return session;
      const threeDays = 60 * 60 * 24 * 3;
      const accessToken = jwt.sign(token.user, process.env.ACCESS_SECRET, { expiresIn: threeDays });
      session.user = {
        ...token.user,
        accessToken,
        emailVerified: null, // type-error 방지
        id: token.user.id!, // type-error 방지
      };
      return session;
    },
  },
});
