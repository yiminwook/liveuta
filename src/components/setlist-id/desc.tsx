'use client';
import { useRouter } from '@bprogress/next';
import { Button, Textarea } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { clientApi } from '@/apis/fetcher';
import TimelineText from '@/components/common/TimestampText';
import { SETLISTS_TAG } from '@/constants/revalidate-tag';
import { useTranslations } from '@/libraries/i18n/client';
import { usePlayer } from '@/stores/player';
import { useSession } from '@/stores/session';
import css from './desc.module.scss';

type DescProps = {
  videoId: string;
  description: string;
};

export default function Desc({ videoId, description }: DescProps) {
  const { t } = useTranslations();
  const router = useRouter();

  const queryClient = useQueryClient();
  const session = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState('');
  const actions = usePlayer((state) => state.actions);

  const toggleEditing = () => {
    if (!session.user) {
      toast.warning(t('setlistId.desc.notLoggedInError'));
      return;
    }

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
    mutationFn: (args: { videoId: string; description: string }) =>
      clientApi
        .put<{ message: string; data: null }>(`v1/setlist/${args.videoId}`, {
          json: { description: args.description },
        })
        .json(),
    onSuccess: () => {
      toast.success(t('setlistId.desc.modified'));
      queryClient.invalidateQueries({ queryKey: [SETLISTS_TAG] });
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = desc.trim();

    if (!session) {
      toast.warning(t('setlistId.desc.notLoggedInError'));
      return;
    }

    if (!description) {
      toast.warning(t('setlistId.desc.noContentError'));
      return;
    }

    mutateSetlist.mutate({
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
            loading={mutateSetlist.isPending}
            disabled={!session}
          >
            {t('setlistId.desc.cancel')}
          </Button>
          <Button
            type="submit"
            variant="default"
            data-variant="save"
            loading={mutateSetlist.isPending}
            disabled={!session}
          >
            {t('setlistId.desc.save')}
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
        {t('setlistId.desc.edit')}
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
