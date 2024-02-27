import { CallbacksJwt, CallbacksSession, CallbacksSignIn } from '@/type/nextAuth';
import dayjs from '@/model/dayjs';
import { Session } from 'next-auth';
import jwt from 'jsonwebtoken';

/**
 *  string을 반환할 경우 해당 path로 이동
 *
 *  @example - return '/live';
 */
export const callbackSignIn: CallbacksSignIn = async ({ user }) => {
  if (user.error) throw new Error(user.error);
  return true;
};

export const callbackJwt: CallbacksJwt = async ({ token, user, trigger }) => {
  if (user) {
    //첫 로그인, user는 첫 로그인시만 들어온다.
    const today = dayjs.tz();
    const loginAt = today.toISOString();
    // const exp = today.clone().add(EXPIRE_MIN, 'minutes').toISOString()
    token.user = {
      email: user.email!,
      name: user.name!,
      picture: user.picture,
      provider: user.provider,
      loginAt,
      accessToken: '',
    };
  }

  const threeDays = 60 * 60 * 24 * 3;
  const payload = {
    email: token.user.email,
    name: token.user.name,
    picture: token.user.picture,
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
