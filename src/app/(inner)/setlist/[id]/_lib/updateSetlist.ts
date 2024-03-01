import axios from 'axios';
import { Session } from 'next-auth';

const updateSetlist = async ({
  session,
  videoId,
  desc,
}: {
  session: Session;
  videoId: string;
  desc: string;
}) => {
  const trimmedDesc = desc.trim();
  if (!trimmedDesc) throw new Error('내용을 입력해주세요.');
  const result = await axios<{ message: string }>({
    method: 'POST',
    url: `/api/setlist/${videoId}`,
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    data: {
      description: trimmedDesc,
    },
  });

  return result.data;
};

export default updateSetlist;
