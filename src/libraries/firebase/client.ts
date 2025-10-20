import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import firebaseConfig from '/firebase-client.json';

export default class FirebaseClient {
  private static instance: FirebaseClient;
  private app: FirebaseApp | null = null;

  public static getInstance(): FirebaseClient {
    if (FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
      FirebaseClient.instance = new FirebaseClient();
      console.log('create new instance');
      FirebaseClient.instance.init();
    }
    // 싱글톤 패턴
    // FirebaseClient의 인스턴스를 하나만 만들어서 사용한다.
    return FirebaseClient.instance;
  }

  private init() {
    console.log('apps', getApps());

    if (getApps().length === 0) {
      this.app = initializeApp(firebaseConfig);
      console.log('Firebase Client initialized!!');
    }
  }

  public get message() {
    if (this.app === null) throw new Error('not initialized');
    return getMessaging(this.app);
  }

  public get analytics() {
    if (this.app === null) throw new Error('not initialized');
    return getAnalytics(this.app);
  }

  public get auth() {
    return getAuth();
  }
}
