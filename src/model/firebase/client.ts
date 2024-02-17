'use client';

import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';
import firebaseConfig from '@/model/firebase/firebaseClient.json';

export default class FirebaseClient {
  private static instance: FirebaseClient;
  private app: FirebaseApp | null = null;

  public static getInstance(): FirebaseClient {
    if (FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
      FirebaseClient.instance = new FirebaseClient();
      FirebaseClient.instance.init();
    }
    // 싱글톤 패턴
    // FirebaseClient의 인스턴스를 하나만 만들어서 사용한다.
    return FirebaseClient.instance;
  }

  private init() {
    if (getApps().length === 0) {
      const app = initializeApp(firebaseConfig);
      this.app = app;
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
}
