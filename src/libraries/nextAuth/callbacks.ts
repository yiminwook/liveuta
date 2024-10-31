import { CallbacksJwt, CallbacksSession, CallbacksSignIn, Payload } from '@/types/nextAuth';
import { Session } from 'next-auth';
import jwt from 'jsonwebtoken';
import { getUserInfo, login } from '../oracleDB/auth/service';

/**
 *  string을 반환할 경우 해당 path로 이동
 *
 *  @example - return '/live';
 */
export const callbackSignIn: CallbacksSignIn = async ({ user, account }) => {
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
};

export const callbackJwt: CallbacksJwt = async ({ token, user, trigger, account }) => {
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

  const userInfo = await getUserInfo({ email: token.user.email, provider: token.user.provider });
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
};

export const callbackSession: CallbacksSession = async ({ session: _session, token }) => {
  const session = _session as Session;
  if (!session) return session;
  session.user = { ...token.user };
  return session;
};
