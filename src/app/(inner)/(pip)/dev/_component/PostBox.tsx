'use client';
import axios, { AxiosError } from 'axios';
import dayjs from '@/model/dayjs';
import { useState } from 'react';
import { PushData } from '@/app/api/push/route';
import { TokenType } from '@/type';
import { toast } from 'sonner';
import * as styles from './home.css';
import cx from 'classnames';

export default function PostBox({ token }: { token: TokenType }) {
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
      toast.error(message);
    } finally {
      setIsLoading(() => false);
    }
  };

  if (typeof token !== 'string') {
    return null;
  }

  return (
    <div className={cx(styles.box)}>
      <label className={styles.postLabel}>알림테스트</label>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <div className={styles.postInputBox}>
          <label className={styles.postInputLabel} htmlFor="title">
            제목
          </label>
          <input
            id="title"
            className={styles.postInput}
            disabled={isLoading}
            type="text"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className={styles.postInputBox}>
          <label className={styles.postInputLabel} htmlFor="body">
            내용
          </label>
          <input
            className={styles.postInput}
            id="body"
            disabled={isLoading}
            type="text"
            value={body}
            onChange={handleBody}
          />
        </div>
        <div className={styles.postInputBox}>
          <label className={styles.postInputLabel} htmlFor="imageUrl">
            이미지 URL
          </label>
          <input
            id="imageUrl"
            className={styles.postInput}
            disabled={isLoading}
            type="text"
            value={imageUrl}
            onChange={handleImageUrl}
            placeholder={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/meta-image.png`}
          />
        </div>
        <div className={styles.postInputBox}>
          <label className={styles.postInputLabel} htmlFor="link">
            링크
          </label>
          <input
            id="link"
            className={styles.postInput}
            disabled={isLoading}
            type="text"
            value={link}
            onChange={handleLink}
            placeholder={`/redirect/youtube/{videoId}`}
          />
        </div>
        <div className={styles.postButtonBox}>
          <button className={styles.postButton} type="submit" disabled={isLoading}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
