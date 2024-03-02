'use client';
import { Session } from '@auth/core/types';
import { App } from 'antd';
import axios, { isAxiosError } from 'axios';
import { MouseEvent, useState } from 'react';
import * as styles from './postForm.css';
import TextareaAutosize from 'react-textarea-autosize';
import { style } from '@vanilla-extract/css';

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

  const clear = (event: MouseEvent) => {
    event.preventDefault();
    setDesc(() => '');
  };

  const paste = (event: MouseEvent) => {
    event.preventDefault();

    navigator.clipboard.readText().then((text) => {
      setDesc(() => text);
    });
  };

  return (
    <form onSubmit={postWrite} className={styles.wrap}>
      <div className={styles.formSection}>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel} htmlFor="youtube-url">
            유튜브 링크
          </label>
          <input
            className={styles.input}
            id="youtube-url"
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
          <div className={styles.textAreaHeader}>
            <label className={styles.textAreaLabel} htmlFor="set-list">
              세트리스트
            </label>
            <div>
              <button className={styles.textAreaControlButton} type="button" onClick={(event) => clear(event)}>
                <svg
                  stroke-width="0"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  color="currentColor"
                >
                  <path d="m10 12.6.7.7 1.6-1.6 1.6 1.6.8-.7L13 11l1.7-1.6-.8-.8-1.6 1.7-1.6-1.7-.7.8 1.6 1.6-1.6 1.6zM1 4h14V3H1v1zm0 3h14V6H1v1zm8 2.5V9H1v1h8v-.5zM9 13v-1H1v1h8z"></path>
                </svg>
              </button>
              <button className={styles.textAreaControlButton} type="button" onClick={(event) => paste(event)}>
                <svg
                  stroke-width="0"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  color="currentColor"
                  fill="currentColor"
                >
                  <path d="M160 0c-23.7 0-44.4 12.9-55.4 32H48C21.5 32 0 53.5 0 80v320c0 26.5 21.5 48 48 48h144V176c0-44.2 35.8-80 80-80h48V80c0-26.5-21.5-48-48-48h-56.6c-11-19.1-31.7-32-55.4-32zm112 128c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h192c26.5 0 48-21.5 48-48V243.9c0-12.7-5.1-24.9-14.1-33.9L430 142.1c-9-9-21.2-14.1-33.9-14.1H272zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.textAreaBody}>
            <TextareaAutosize
              className={styles.textArea}
              id="set-list"
              value={desc}
              disabled={isPending}
              onChange={handleDesc}
              minRows={18}
              placeholder={'38:53 노래제목1\n138:54 노래제목2\n238:54 노래제목3\n338:54 노래제목4'}
            />
          </div>
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
