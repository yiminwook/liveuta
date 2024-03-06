'use client';
import Text from '@inner/(pip)/setlist/_component/Text';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import updateSetlist from '../_lib/updateSetlist';
import * as styles from './desc.css';
import { toast } from 'sonner';

interface DescProps {
  videoId: string;
  description: string;
  session: Session | null;
}

export default function Desc({ session, videoId, description }: DescProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(description);

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
    mutationKey: ['updateSetlist', videoId],
    mutationFn: updateSetlist,
    onSuccess: () => {
      toast.success('수정되었습니다.');
      handleCancel();
      router.refresh();
    },
    onError: (error) => {
      let message = error.message;
      if (isAxiosError(error)) {
        message = error.response?.data.message || message;
      }
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;
    mutateSetlist.mutate({ session, videoId, desc });
  };

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
          <Text key={`${videoId}_row_${index}`} index={index} text={line} videoId={videoId} />
        ))}
      </div>
    </div>
  );
}
