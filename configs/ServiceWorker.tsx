'use client';

import FirebaseClient from '@/models/firebase/client';
import { MessagePayload, getToken, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ServiceWorker = () => {
  const handleMessage = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
      //알림허용설정을 거절하면 사용자가 직접 크롬에서 설정값을 변경해야함
      const messaging = FirebaseClient.getInstance().message;
      console.log('env', process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY);

      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      console.log('=====token=====', token);

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

  return <></>;
};

export default ServiceWorker;
