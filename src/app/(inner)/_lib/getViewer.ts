'use server';
import axios from 'axios';

export async function getViewer(id: string) {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://youtube.com/watch?v=${id}`,
    });

    const pattern = /\{"text"\:"현재 "\},\{"text"\:"(\d+(?:,\d{3})*)"\},\{"text"\:"명 시청 중"\}/;
    const count = res.data.match(pattern)?.[1];

    return typeof count !== 'string' ? '?' : count;
  } catch (error) {
    console.log('viewer ServerAction', error);
    return '?';
  }
}
