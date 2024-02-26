import FirebaseClient from '@/model/firebase/client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('openid');
    provider.addScope('email');
    // const scope = provider.getScopes();
    // console.log('scope', scope);
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    const auth = FirebaseClient.getInstance().auth;
    const signInResult = await signInWithPopup(auth, provider);
    if (!signInResult.user) throw new Error('Faild signIn');
    console.log('signInResult', signInResult);
    // TODO: 서버로 result 전송, 쿠키에 저장
    return signInResult;
  } catch (error) {
    console.error(error);
  }
};
