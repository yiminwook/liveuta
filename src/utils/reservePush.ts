import { PushData } from '@api/push/route';
import axios from 'axios';

// TODO: DeletePush 추가

export interface ReservePushArgs {
  title: string;
  body: string;
  token: string;
  timestamp: string;
  imageUrl: string;
  link: string;
  channelName: string;
}

const reservePush = async ({
  title,
  body,
  token,
  timestamp,
  imageUrl,
  link,
  channelName,
}: ReservePushArgs) => {
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
    url: '/api/v1/reserve/push',
    data,
  });

  return {
    message: response.data.message,
    channelName,
    title,
  };
};

export default reservePush;
