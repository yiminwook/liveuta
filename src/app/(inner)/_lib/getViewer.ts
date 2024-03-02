import axios from 'axios';

export async function getViewer(id: string) {
  // const yturl = `https://youtube.com/watch?v=${id}`;
  const res = await axios<{ count: string }>({
    method: 'GET',
    url: `https://yt.grs0412.workers.dev/?v=${id}`,
  });

  // const pattern = /\{"text"\:"현재 "\},\{"text"\:"(\d+(?:,\d{3})*)"\},\{"text"\:"명 시청 중"\}/;
  // const count = res.data.match(pattern)?.[1];

  // return typeof count !== 'string' ? '?' : count;
  return res.data.count;
}
