'use client';
import { PushData } from '@/app/api/push/route';
import dayjs from '@/libraries/dayjs';
import { TToken } from '@/types';
import axios, { AxiosError } from 'axios';
import cx from 'classnames';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import css from './Home.module.scss';

export default function PostBox({ token }: { token: TToken }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('dev.postBox');

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
    <div className={cx(css.box)}>
      <label className={css.postLabel}>{t('postLabel')}</label>
      <form className={css.postForm} onSubmit={handleSubmit}>
        <div className={css.postInputBox}>
          <label className={css.postInputLabel} htmlFor="title">
            {t('title')}
          </label>
          <input
            id="title"
            className={css.postInput}
            disabled={isLoading}
            type="text"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className={css.postInputBox}>
          <label className={css.postInputLabel} htmlFor="body">
            {t('inputLabel')}
          </label>
          <input
            className={css.postInput}
            id="body"
            disabled={isLoading}
            type="text"
            value={body}
            onChange={handleBody}
          />
        </div>
        <div className={css.postInputBox}>
          <label className={css.postInputLabel} htmlFor="imageUrl">
            {t('imageUrlInput')}
          </label>
          <input
            id="imageUrl"
            className={css.postInput}
            disabled={isLoading}
            type="text"
            value={imageUrl}
            onChange={handleImageUrl}
            placeholder={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/meta-image.png`}
          />
        </div>
        <div className={css.postInputBox}>
          <label className={css.postInputLabel} htmlFor="link">
            {t('linkLabel')}
          </label>
          <input
            id="link"
            className={css.postInput}
            disabled={isLoading}
            type="text"
            value={link}
            onChange={handleLink}
            placeholder={`/redirect/youtube/{videoId}`}
          />
        </div>
        <div className={css.postButtonBox}>
          <button className={css.button} data-variant="post" type="submit" disabled={isLoading}>
            {t('send')}
          </button>
        </div>
      </form>
    </div>
  );
}
