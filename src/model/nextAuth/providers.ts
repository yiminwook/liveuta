import { GoogleProvider } from '@/type/nextAuth';

export const googleProfile: GoogleProvider = async (profile, tokens) => {
  console.log('profile', profile);
  console.log('tokens', tokens);
  return {};
};
