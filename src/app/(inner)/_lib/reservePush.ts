'use client';
import { PushData } from '@/app/api/push/route';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface ReservePushProps {
  title: string;
  body: string;
  token: string;
  timestamp: string;
  imageUrl: string;
  link: string;
}

const reservePush = async ({ title, body, token, timestamp, imageUrl, link }: ReservePushProps) => {
  const data: PushData = {
    title,
    body,
    token,
    timestamp,
    imageUrl,
    link,
  };

  const response = await axios<{ message: string }>({
    method: 'POST',
    url: '/api/sheet',
    data,
  });

  return response;
};

const useMutatePush = ({ key }: { key: string }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['push', key],
    mutationFn: reservePush,
  });

  return { pushMutateAsync: mutateAsync, isPendingPush: isPending };
};

export default useMutatePush;
