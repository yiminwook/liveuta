'use client';
import { tokenAtom } from '@/atoms';
import FirebaseClient from '@/models/firebase/client';
import { MessagePayload, getToken, onMessage } from 'firebase/messaging';
import { useSetAtom } from 'jotai';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'react-toastify';

const ServiceWorker = ({ children }: PropsWithChildren) => {
  const setToken = useSetAtom(tokenAtom);

  const handleToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      //알림허용설정을 거절하면 사용자가 직접 크롬에서 설정값을 변경해야함
      if (permission !== 'granted') {
        throw new Error('알림허용 설정이 되지 않았습니다.');
      }
      //허용후 등록
      const register = await navigator.serviceWorker.register('/sw.js');

      const messaging = FirebaseClient.getInstance().message;

      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: register,
      });

      setToken(() => token);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      alert(message);
      setToken(() => undefined);
    }
  };

  const handleMessage = async () => {
    try {
      await handleToken();

      const messaging = FirebaseClient.getInstance().message;

      //TODO: 토큰을 서버로 전달
      onMessage(messaging, ({ notification, data, fcmOptions, from, collapseKey, messageId }: MessagePayload) => {
        console.log('notification', notification);

        if (notification?.body === undefined) return;

        toast.info(notification.body);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default ServiceWorker;
