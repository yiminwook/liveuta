import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { google } from 'googleapis';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replaceAll(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
export const FIREBASE_SCOPES = [MESSAGING_SCOPE];

export const getAccessToken = () => {
  return new Promise<string>(function (resolve, reject) {
    const jwtClient = new google.auth.JWT({
      email: config.clientEmail,
      key: config.privateKey,
      scopes: FIREBASE_SCOPES,
    });
    jwtClient.authorize(function (err, tokens) {
      const access_token = tokens?.access_token;
      if (err || access_token === undefined || access_token === null) {
        return reject(err);
      }
      return resolve(access_token);
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

    console.log('FirebaseAdmin init!!!');
    admin.initializeApp({
      credential: admin.credential.cert(config),
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
