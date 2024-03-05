import { GoogleProvider, NaverProvider } from '@/type/nextAuth';
import { User } from 'next-auth';
import { login } from '../../src/model/oracleDB/auth/service';

// export const googleProfile: GoogleProvider = async (profile, tokens): Promise<User> => {
//   try {
//     // cookies().set('hello', 'world'); 쿠키저장 가능
//     await login({ email: profile.email, provider: 'google' });
//     return {
//       email: profile.email,
//       name: profile.name,
//       picture: profile.picture,
//       provider: 'google',
//     };
//   } catch (error) {
//     console.error('googleProfile', error);
//   }
// };

// export const naverProfile: NaverProvider = async (profile, tokens): Promise<User> => {
//   try {
//     console.log('naverProfile', profile);
//     console.log('naver', tokens);

//     return {
//       email: profile.email,
//       name: profile.name,
//       picture: profile.picture,
//       provider: 'naver',
//     };
//   } catch (error) {
//     console.error('naverProfile', error);
//   }
// };
