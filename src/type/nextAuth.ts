import { CredentialsConfig, OAuth2Config } from '@auth/core/providers';
import { Account, CallbacksOptions, EventCallbacks, Profile } from '@auth/core/types';
import { GoogleProfile } from 'next-auth/providers/google';

export type GoogleProvider = OAuth2Config<GoogleProfile>['profile'];
export type CredentialAuthorize = CredentialsConfig<any>['authorize'];
export type SignOut = EventCallbacks['signOut'];
export type CallbacksSignIn = CallbacksOptions<Profile, Account>['signIn'];
export type CallbacksSession = CallbacksOptions<Profile, Account>['session'];
export type CallbacksJwt = CallbacksOptions<Profile, Account>['jwt'];
