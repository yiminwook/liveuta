import { CredentialsConfig, ProfileCallback } from '@auth/core/providers';
import { Account, CallbacksOptions, EventCallbacks, Profile } from '@auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';
import { NaverProfile } from 'next-auth/providers/naver';
import { KakaoProfile } from 'next-auth/providers/kakao';
import { DiscordProfile } from '@auth/core/providers/discord';

export type Payload = {
  id: number;
  userLv: number;
  email: string;
  name: string | null | undefined;
  image: string | null | undefined;
  loginAt: string;
  provider: string;
  disabled: boolean;
};

export type Provider = 'google' | 'kakao' | 'discord';
export type GoogleProvider = ProfileCallback<GoogleProfile>;
export type NaverProvider = ProfileCallback<NaverProfile>;
export type KakaoProvider = ProfileCallback<KakaoProfile>;
export type DiscordProvider = ProfileCallback<DiscordProfile>;

export type CredentialAuthorize = CredentialsConfig<any>['authorize'];
export type SignOut = EventCallbacks['signOut'];
export type CallbacksSignIn = CallbacksOptions<Profile, Account>['signIn'];
export type CallbacksSession = CallbacksOptions<Profile, Account>['session'];
export type CallbacksJwt = CallbacksOptions<Profile, Account>['jwt'];
