'use client';
import { getToken } from 'firebase/messaging';
import FirebaseClient from './client';

export const generateFcmToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    return undefined;
  }

  const register = await navigator.serviceWorker.register('/sw.js');
  const messaging = FirebaseClient.getInstance().message;
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: register,
  });

  return token;
};
