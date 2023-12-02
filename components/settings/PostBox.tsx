import { tokenAtom } from '@/atoms';
import Settings from '@/components/settings/Settings.module.scss';
import axios, { AxiosError } from 'axios';
import dayjs from '@/models/dayjs';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PushData } from '@/app/api/push/route';

const PostBox = () => {
  const token = useAtomValue(tokenAtom);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value.trim());
  };

  const handleBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(() => e.target.value.trim());
  };

  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(() => e.target.value.trim());
  };

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(() => e.target.value.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (typeof token !== 'string' || isLoading) return;

      const requestBody: PushData = {
        title,
        body,
        token,
        timestamp: dayjs().toDate().getTime().toString(),
        link,
        imageUrl: imageUrl === '' ? 'https://liveuta.vercel.app/assets/meta-image.png' : imageUrl,
      };

      setIsLoading(() => true);

      const res = await axios({
        method: 'POST',
        url: '/api/push',
        data: [requestBody],
      });

      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
      let message = 'Unknown Error';
      if (error instanceof AxiosError) {
        message = error.response?.data.data as string;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message, { autoClose: 3000 });
    } finally {
      setIsLoading(() => false);
    }
  };

  if (typeof token !== 'string') {
    return null;
  }

  return (
    <div className={Settings['post-box']}>
      <label>알림테스트</label>
      <form onSubmit={handleSubmit}>
        <div className={Settings['post-input-box']}>
          <label htmlFor="">제목</label>
          <input id="title" disabled={isLoading} type="text" value={title} onChange={handleTitle} />
        </div>
        <div className={Settings['post-input-box']}>
          <label htmlFor="">내용</label>
          <input id="body" disabled={isLoading} type="text" value={body} onChange={handleBody} />
        </div>
        <div className={Settings['post-input-box']}>
          <label htmlFor="imageUrl">이미지 URL</label>
          <input
            disabled={isLoading}
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={handleImageUrl}
            placeholder={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/meta-image.png`}
          />
        </div>
        <div className={Settings['post-input-box']}>
          <label htmlFor="imageUrl">링크</label>
          <input
            disabled={isLoading}
            id="link"
            type="text"
            value={link}
            onChange={handleLink}
            placeholder={`/redirect/youtube/{videoId}`}
          />
        </div>
        <div className={Settings['post-button-box']}>
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostBox;
