'use client';
import FirebaseClient from '@/models/firebase/client';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

const ServiceWorker = () => {
  const handleMessage = async () => {
    try {
      await generateFcmToken();

      const messaging = FirebaseClient.getInstance().message;
      onMessage(messaging, ({ data, from, collapseKey, messageId }) => {
        if (data === undefined) return;

        const noti = new Notification(data.title!, {
          body: data.body,
          image: data.imageUrl!,
          timestamp: Number(data.timestamp),
        });

        noti.onclick = () => {
          const url = window.location.href;
          if (url !== data.link) {
            window.open(data.link);
          }
          noti.close();
        };
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
