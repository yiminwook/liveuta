'use client';
import { clientApi } from '@/apis/fetcher';
import { PushData } from '@/app/api/push/route';
import dayjs from '@/libraries/dayjs';
import { useTranslations } from '@/libraries/i18n/client';
import { TToken } from '@/types';
import clsx from 'clsx';
import { BatchResponse } from 'firebase-admin/messaging';
import { useState } from 'react';
import { toast } from 'sonner';
import css from './Home.module.scss';

export default function PostBox({ token }: { token: TToken }) {
  const { t } = useTranslations();

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

      const json = await clientApi.post<BatchResponse>('api/push', { json: [requestBody] }).json();

      console.log(json);
    } catch (error) {
      console.log(error);
      let message = 'Unknown Error';

      if (error instanceof Error) {
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
    <div className={clsx(css.box)}>
      <label className={css.postLabel}>{t('dev.postBox,postLabel')}</label>
      <form className={css.postForm} onSubmit={handleSubmit}>
        <div className={css.postInputBox}>
          <label className={css.postInputLabel} htmlFor="title">
            {t('dev.postBox.title')}
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
            {t('dev.postBox.inputLabel')}
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
            {t('dev.postBox.imageUrlInput')}
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
            {t('dev.postBox.linkLabel')}
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
            {t('dev.postBox.send')}
          </button>
        </div>
      </form>
    </div>
  );
}
