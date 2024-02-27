import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { GoogleProfile } from 'next-auth/providers/google';
import { googleProfile } from './providers';
import { signOut } from './events';
import { callbackSignIn, callbackJwt, callbackSession } from './callbacks';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: 'sessionout',
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
      profile: googleProfile,
    }),
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
