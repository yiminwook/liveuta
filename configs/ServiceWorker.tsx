// eslint-disable-next-line react-hooks/exhaustive-deps

'use client';
import { tokenAtom } from '@/atoms';
import FirebaseClient from '@/models/firebase/client';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { onMessage } from 'firebase/messaging';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

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
      onMessage(messaging, ({ data, from, collapseKey, messageId }) => {
        if (data === undefined) return;
        const noti = new Notification(data.title!, {
          body: data.body,
          image: data.image!,
          timestamp: Number(data.timestamp),
        });
        noti.onclick = () => {
          window.open(data.link);
        };
        // toast.info(notification.body);
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
