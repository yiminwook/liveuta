import * as admin from 'firebase-admin';

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replaceAll(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

export default class FirebaseAdmin {
  private static instance: FirebaseAdmin;

  public static getInstance(): FirebaseAdmin {
    if (FirebaseAdmin.instance === undefined || FirebaseAdmin.instance === null) {
      //초기화 진행
      FirebaseAdmin.instance = new FirebaseAdmin();
      FirebaseAdmin.instance.init();
    }

    return FirebaseAdmin.instance;
  }

  private init() {
    if (admin.apps.length !== 0) return;
    console.log('FirebaseAdmin init!!!');
    admin.initializeApp({
      credential: admin.credential.cert(config),
    });
  }
}
