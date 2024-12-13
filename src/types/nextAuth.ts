import { ProfileCallback } from '@auth/core/providers';
import { DiscordProfile } from '@auth/core/providers/discord';
import { GoogleProfile } from 'next-auth/providers/google';
import { KakaoProfile } from 'next-auth/providers/kakao';
import { NaverProfile } from 'next-auth/providers/naver';

export type Payload = {
  id: number;
  userLv: number;
  email: string;
  name: string | null | undefined;
  image: string | null | undefined;
  loginAt: string;
  provider: string;
};

export type Provider = 'google' | 'kakao' | 'discord';
export type GoogleProvider = ProfileCallback<GoogleProfile>;
export type NaverProvider = ProfileCallback<NaverProfile>;
export type KakaoProvider = ProfileCallback<KakaoProfile>;
export type DiscordProvider = ProfileCallback<DiscordProfile>;
