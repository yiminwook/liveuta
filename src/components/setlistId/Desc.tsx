'use client';
import TimelineText from '@/components/common/TimestampText';
import { playerStatusAtom } from '@/stores/player';
import { Textarea } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import { useTransitionRouter } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import css from './Desc.module.scss';

type DescProps = {
  videoId: string;
  description: string;
  session: Session | null;
};

export default function Desc({ session, videoId, description }: DescProps) {
  const router = useTransitionRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState('');
  const setPlayerStatus = useSetAtom(playerStatusAtom);
  const queryClient = useQueryClient();

  const toggleEditing = () => {
    if (!session) return toast.warning('로그인이 필요한 서비스입니다.');
    setIsEditing((pre) => !pre);
  };

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDesc(() => value);
  };

  const handleCancel = () => {
    setDesc(() => description);
    setIsEditing(() => false);
  };

  const mutateSetlist = useMutation({
    mutationKey: ['updateSetlist'],
    mutationFn: async ({
      session,
      videoId,
      description,
    }: {
      session: Session;
      videoId: string;
      description: string;
    }) => {
      const response = await axios.put<{ message: string; data: null }>(
        `/api/v1/setlist/${videoId}`,
        { description },
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } },
      );
      return response.data;
    },
    onSuccess: (result) => {
      toast.success('수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['searchSetlist'] });
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = desc.trim();

    if (!session) {
      return toast.warning('로그인이 필요한 서비스입니다.');
    }

    if (!description) {
      return toast.warning('내용을 입력해주세요.');
    }

    mutateSetlist.mutate({
      session,
      videoId,
      description,
    });
  };

  const handleTimestamp = ({ timestamp }: { videoId: string; timestamp: number }) => {
    setPlayerStatus((pre) => ({ ...pre, timeline: timestamp, isPlaying: true, hide: false }));
  };

  useEffect(() => {
    handleCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  if (isEditing) {
    return (
      <form className={css.wrap} onSubmit={handleSubmit}>
        <div className={css.buttons}>
          <button
            type="button"
            className={css.button}
            data-variant="cancel"
            onClick={handleCancel}
            disabled={mutateSetlist.isPending}
          >
            취소
          </button>
          <button
            type="submit"
            className={css.button}
            data-variant="save"
            disabled={mutateSetlist.isPending}
          >
            저장
          </button>
        </div>
        <div className={css.inner}>
          <Textarea
            autosize
            disabled={mutateSetlist.isPending}
            value={desc}
            onChange={handleDesc}
          />
        </div>
      </form>
    );
  }

  return (
    <div className={css.wrap}>
      <button type="button" className={css.button} data-variant="edit" onClick={toggleEditing}>
        편집
      </button>
      <div className={css.inner}>
        {description.split('\n').map((line, index) => (
          <TimelineText
            key={`${videoId}_row_${index}`}
            index={index}
            text={line}
            videoId={videoId}
            onClickTimestamp={handleTimestamp}
          />
        ))}
      </div>
    </div>
  );
}
