'use client';
import TimelineText from '@/components/common/TimestampText';
import { useRouter as i18nRouter } from '@/i18n/routing';
import { useSetPlayerStore } from '@/stores/player';
import { Button, Textarea } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import css from './Desc.module.scss';

type DescProps = {
  videoId: string;
  description: string;
  session: Session | null;
};

export default function Desc({ session, videoId, description }: DescProps) {
  const router = useRouter(i18nRouter);
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState('');
  const actions = useSetPlayerStore();
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
    onSuccess: () => {
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
    actions.setTimeline(timestamp);
  };

  useEffect(() => {
    handleCancel();
  }, [description]);

  if (isEditing) {
    return (
      <form className={css.wrap} onSubmit={handleSubmit}>
        <div className={css.buttons}>
          <Button
            type="button"
            variant="filled"
            color="red"
            onClick={handleCancel}
            disabled={mutateSetlist.isPending}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="default"
            data-variant="save"
            disabled={mutateSetlist.isPending}
          >
            저장
          </Button>
        </div>
        <div className={css.inner}>
          <Textarea
            className={css.textarea}
            autosize
            disabled={mutateSetlist.isPending}
            value={desc}
            onChange={handleDesc}
            minRows={5}
          />
        </div>
      </form>
    );
  }

  return (
    <div className={css.wrap}>
      <Button type="button" color="third" onClick={toggleEditing}>
        편집
      </Button>
      <div className={css.inner}>
        {description
          .split('\n')
          .filter((item) => item !== '')
          .map((line, index) => (
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
