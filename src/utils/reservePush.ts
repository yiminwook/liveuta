import { PushData } from '@api/push/route';
import axios from 'axios';

// TODO: DeletePush 추가

interface ReservePushArgs {
  title: string;
  body: string;
  token: string;
  timestamp: string;
  imageUrl: string;
  link: string;
}

const reservePush = async ({ title, body, token, timestamp, imageUrl, link }: ReservePushArgs) => {
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
    url: '/api/reserve/push',
    data,
  });

  return response;
};

export default reservePush;
