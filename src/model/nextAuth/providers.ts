import { GoogleProvider } from '@/type/nextAuth';
import { User } from 'next-auth';

export const googleProfile: GoogleProvider = async (profile, tokens): Promise<User> => {
  try {
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
