// eslint-disable-next-line react-hooks/exhaustive-deps

'use client';
import { tokenAtom } from '@/atoms';
import FirebaseClient from '@/models/firebase/client';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { MessagePayload, onMessage } from 'firebase/messaging';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ServiceWorker = () => {
  const setToken = useSetAtom(tokenAtom);

  const handleToken = async () => {
    try {
      const token = await generateFcmToken();

      //TODO: 토큰이 있으면 서버로 전달
      setToken(() => token);
    } catch (error) {
      console.error(error);
      setToken(() => undefined);
    }
  };

  const handleMessage = async () => {
    try {
      await handleToken();

      const messaging = FirebaseClient.getInstance().message;
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
  }, []);

  return <></>;
};

export default ServiceWorker;
