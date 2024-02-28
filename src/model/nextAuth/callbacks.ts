import { CallbacksJwt, CallbacksSession, CallbacksSignIn, Payload } from '@/type/nextAuth';
import { Session } from 'next-auth';
import jwt from 'jsonwebtoken';
import { getUserInfo } from '../oracleDB/auth/service';

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
    token.user = {
      userLv: 0,
      email: user.email!,
      name: user.name!,
      picture: user.picture,
      provider: user.provider,
      loginAt: '',
      accessToken: '',
      disabled: false,
    };
  }

  const userInfo = await getUserInfo({ email: token.user.email, provider: token.user.provider });
  token.user.userLv = userInfo.lv;
  token.user.loginAt = userInfo.loginAt.toISOString();
  token.user.disabled = userInfo.disabled;

  const threeDays = 60 * 60 * 24 * 3;

  const payload: Payload = {
    id: userInfo.id,
    userLv: token.user.userLv,
    email: token.user.email,
    name: token.user.name,
    picture: token.user.picture,
    loginAt: token.user.loginAt,
    provider: token.user.provider,
    disabled: token.user.disabled,
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
