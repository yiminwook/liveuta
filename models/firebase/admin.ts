import { serverEnvConfig } from '@/configs/envConfig';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { google } from 'googleapis';

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = serverEnvConfig();

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SHEET_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
export const FIREBASE_SCOPES = [MESSAGING_SCOPE, SHEET_SCOPE];

export const jwtAuth = new google.auth.JWT(FIREBASE_CLIENT_EMAIL, '', FIREBASE_PRIVATE_KEY, FIREBASE_SCOPES);

export const getAccessToken = () => {
  return new Promise<string>((resolve, reject) => {
    jwtAuth.authorize((error, tokens) => {
      const accessToken = tokens?.access_token;
      if (error || accessToken === undefined || accessToken === null) {
        return reject(error);
      }
      return resolve(accessToken);
    });
  });
};

export default class FirebaseAdmin {
  private static instance: FirebaseAdmin;
  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (FirebaseAdmin.instance === undefined || FirebaseAdmin.instance === null) {
      //초기화 진행
      FirebaseAdmin.instance = new FirebaseAdmin();
      FirebaseAdmin.instance.bootstrap();
    }

    return FirebaseAdmin.instance;
  }

  private bootstrap() {
    const haveapp = admin.apps.length !== 0;

    if (haveapp) {
      this.init = true;
      return;
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY,
      }),
    });

    this.init = true;
  }

  public get auth() {
    if (this.init === false) {
      this.bootstrap();
    }
    return getAuth();
  }
}
