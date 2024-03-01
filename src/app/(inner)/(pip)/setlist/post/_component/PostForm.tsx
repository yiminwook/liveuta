'use client';
import { Session } from '@auth/core/types';
import { App } from 'antd';
import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import * as styles from './postForm.css';
import TextareaAutosize from 'react-textarea-autosize';

interface PostFormProps {
  session: Session;
}

export default function PostForm({ session }: PostFormProps) {
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [isPending, setIsPending] = useState(false);

  const { notification } = App.useApp();

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDesc(() => value);
  };

  const postWrite = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsPending(() => true);
      const videoId = url.match(/(?:\?v=|&v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      const description = desc.trim();

      if (!videoId) throw new Error('올바른 유튜브 URL을 입력해주세요.');
      if (!description) throw new Error('세트리를 입력해주세요.');

      const result = await axios<{ message: string }>({
        method: 'POST',
        url: '/api/setlist',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        data: {
          videoId,
          description,
        },
      });

      console.log(result.data.message);
      setIsPending(() => false);
      notification.success({ message: '세트리가 입력 되었습니다.' });
    } catch (error) {
      setIsPending(() => false);
      let message = '알 수 없는 오류가 발생했습니다.';
      if (isAxiosError(error)) {
        message = error.response?.data.message || message;
        return notification.error({ message });
      }
      message = error instanceof Error ? error.message : message;
      notification.error({ message });
    }
  };

  return (
    <form onSubmit={postWrite} className={styles.wrap}>
      <div>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            placeholder="https://www.youtube.com/watch?v=UkPN32C4wzc"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>
      <div>
        <div className={styles.textAreaBox}>
          <TextareaAutosize
            className={styles.textArea}
            value={desc}
            disabled={isPending}
            onChange={handleDesc}
            placeholder={'38:53 노래제목1\n138:54 노래제목2\n238:54 노래제목3\n338:54 노래제목4'}
          />
        </div>
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.button} type="submit" disabled={isPending}>
          제출
        </button>
      </div>
    </form>
  );
}
