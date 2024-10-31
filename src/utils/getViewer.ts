import axios from 'axios';

export async function getViewer(id: string) {
  const res = await axios<{ count: string }>({
    method: 'GET',
    url: `/api/proxy/viewer?v=${id}`,
  });
  return res.data.count;
}
