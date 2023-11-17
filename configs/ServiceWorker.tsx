'use client';
import { tokenAtom } from '@/atoms';
import FirebaseClient from '@/models/firebase/client';
import { MessagePayload, getToken, onMessage } from 'firebase/messaging';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ServiceWorker = () => {
  const setTokenAtom = useSetAtom(tokenAtom);

  const handleMessage = async () => {
    try {
      //가장 먼저 서비스워커를 등록해야함.
      const register = await navigator.serviceWorker.register('/sw.js');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
      //알림허용설정을 거절하면 사용자가 직접 크롬에서 설정값을 변경해야함
      const messaging = FirebaseClient.getInstance().message;

      const token = await getToken(messaging, {
        vapidKey: undefined, //ios에서 vapidKey가 있으면 token이 발급되지 않음.
        serviceWorkerRegistration: register,
      });

      setTokenAtom(() => token);

      //TODO: 토큰을 서버로 전달
      onMessage(messaging, ({ notification, data, fcmOptions, from, collapseKey, messageId }: MessagePayload) => {
        console.log('notification', notification);

        if (notification?.body === undefined) return;

        toast.info(notification.body);
      });
    } catch (error) {
      console.error(error);
      setTokenAtom(() => undefined);
    }
  };

  useEffect(() => {
    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default ServiceWorker;
