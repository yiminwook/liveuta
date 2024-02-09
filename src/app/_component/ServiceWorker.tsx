'use client';
import clientOnly from '@/model/clientOnly';
import FirebaseClient from '@/model/firebase/client';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import { useQuery } from '@tanstack/react-query';
import { onMessage } from 'firebase/messaging';
import { PropsWithChildren, useEffect } from 'react';

export default clientOnly(function ServiceWorker({ children }: PropsWithChildren) {
  const handleMessage = () => {
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
  };

  const { status, isPending } = useQuery({
    queryKey: ['fcmToken'],
    queryFn: async () => {
      try {
        const token = await generateFcmToken();
        if (token === undefined) throw new Error('Token is undefined');
        alert(token);
        return token;
      } catch (error) {
        alert(error);
        throw error;
      }
    },
    retry: 5,
    retryDelay: 2000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (status === 'success') {
      handleMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return <></>;
});
