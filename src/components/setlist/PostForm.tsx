'use client';
import { TextInput, Textarea } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';
import css from './PostForm.module.scss';

type PostFormProps = {
  session: Session | null;
};

export default function PostForm({ session }: PostFormProps) {
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const queryClient = useQueryClient();

  const mutatePost = useMutation({
    mutationKey: ['postSetlist'],
    mutationFn: async ({
      session,
      videoId,
      description,
    }: {
      session: Session;
      videoId: string;
      description: string;
    }) => {
      const response = await axios.post<{ message: string; data: null }>(
        `/api/v1/setlist/${videoId}`,
        { description },
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('세트리가 입력 되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['searchSetlist'] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDesc(() => value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = url.match(/(?:\?v=|&v=|youtu\.be\/)([^&\n?#]+)/)?.[1].trim();
    const description = desc.trim();

    if (!videoId) {
      return toast.warning('올바른 유튜브 URL을 입력해주세요.');
    }

    if (!description) {
      return toast.warning('세트리를 입력해주세요.');
    }

    if (session === null) {
      return toast.warning('로그인을 해주세요.');
    }

    mutatePost.mutate({ videoId, description, session });
  };

  const clear = (e: MouseEvent) => {
    e.preventDefault();
    setDesc(() => '');
  };

  const paste = (e: MouseEvent) => {
    e.preventDefault();

    navigator.clipboard.readText().then((text) => {
      setDesc(() => text);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.wrap}>
      <div className={css.formSection}>
        <div className={css.inputBox}>
          <TextInput
            className={css.input}
            id="youtube-url"
            label="유튜브 링크"
            placeholder="https://www.youtube.com/watch?v=UkPN32C4wzc"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={mutatePost.isPending}
          />
        </div>
      </div>
      <div>
        <div className={css.textAreaSection}>
          <div className={css.textAreaHeader}>
            <label className={css.textAreaLabel} htmlFor="set-list">
              세트리스트
            </label>
            <div>
              <button
                className={css.textAreaControlButton}
                type="button"
                onClick={(event) => clear(event)}
              >
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
              <button
                className={css.textAreaControlButton}
                type="button"
                onClick={(event) => paste(event)}
              >
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
          <Textarea
            id="set-list"
            value={desc}
            disabled={mutatePost.isPending}
            onChange={handleDesc}
            minRows={14}
            maxRows={14}
            autosize
            placeholder={'38:53 노래제목1\n138:54 노래제목2\n238:54 노래제목3\n338:54 노래제목4'}
          />
        </div>
      </div>
      <button className={css.submit} type="submit" disabled={mutatePost.isPending}>
        제출
      </button>
    </form>
  );
}
