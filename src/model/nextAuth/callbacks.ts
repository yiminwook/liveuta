import { CallbacksJwt, CallbacksSession, CallbacksSignIn } from '@/type/nextAuth';

export const callbackSignIn: CallbacksSignIn = async (params) => {
  return true;
};

export const callbackJwt: CallbacksJwt = async (params) => {
  const user = params.user;
  return params.token;
};

export const callbackSession: CallbacksSession = async (params) => {
  const token = params.token;
  return params.session;
};
