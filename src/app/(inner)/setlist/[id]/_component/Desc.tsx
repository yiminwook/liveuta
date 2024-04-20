'use client';
import TimelineText from '@inner/_component/TimestampText';
import { playerStatusAtom } from '@inner/_lib/atom/player';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';
import * as styles from './desc.css';
import axios from 'axios';

type DescProps = {
  videoId: string;
  description: string;
  session: Session | null;
};

export default function Desc({ session, videoId, description }: DescProps) {
  const router = useRouter();
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
        `/api/setlist/${videoId}`,
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
      <form className={styles.wrap} onSubmit={handleSubmit}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={mutateSetlist.isPending}
        >
          취소
        </button>
        <button type="submit" className={styles.editButton} disabled={mutateSetlist.isPending}>
          저장
        </button>
        <div className={styles.inner}>
          <TextareaAutosize
            disabled={mutateSetlist.isPending}
            className={styles.textarea}
            value={desc}
            onChange={handleDesc}
          />
        </div>
      </form>
    );
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.editButton} onClick={toggleEditing}>
        편집
      </button>
      <div className={styles.inner}>
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
