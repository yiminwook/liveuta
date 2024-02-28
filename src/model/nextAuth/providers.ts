import { GoogleProvider } from '@/type/nextAuth';
import { User } from 'next-auth';
import { login } from '../oracleDB/auth/service';

export const googleProfile: GoogleProvider = async (profile, tokens): Promise<User> => {
  try {
    // cookies().set('hello', 'world'); 쿠키저장 가능

    await login({ email: profile.email, provider: 'google' });
    return {
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: 'google',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      email: '',
      name: '',
      picture: '',
      provider: 'google',
      error: message,
    };
  }
};
