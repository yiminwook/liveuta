'use client';
import dayjs from '@/libraries/dayjs';
import { ChannelDatesetItem } from '@/libraries/mongoDB/channels';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateChannelUrl, generateVideoUrl } from '@/libraries/youtube/url';
import { useSetPlayerStore } from '@/stores/player';
import { DeleteSetlistRes, SETLIST_DELETE_LEVEL } from '@/types/api/setlist';
import { openWindow } from '@/utils/windowEvent';
import BiMusicNoteList from '@icons/bi/MusicNoteList';
import IonArrowBack from '@icons/ion/ArrowBack';
import LogosYoutubeIcon from '@icons/logos/YouTubeIcon';
import { Avatar, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import cx from 'classnames';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { toast } from 'sonner';
import css from './Info.module.scss';

type InfoProps = {
  setlist: Setlist;
  channel: ChannelDatesetItem;
  icon: string;
};

export default function Info({ setlist, channel, icon }: InfoProps) {
  const session = useSession().data;
  const router = useRouter();
  const queryClient = useQueryClient();
  const videoUrl = generateVideoUrl(setlist.videoId);
  const channelUrl = generateChannelUrl(channel.channelId);
  const t = useTranslations('setlistId.info');
  const locale = useLocale();
  const dayjsTemplate = useTranslations();

  const broadcast = dayjs(setlist.broadcastAt)
    .locale(locale)
    .format(dayjsTemplate('dayjsTemplate'));
  const create = dayjs(setlist.createdAt).locale(locale).format(dayjsTemplate('dayjsTemplate'));
  const update = dayjs(setlist.updatedAt).locale(locale).format(dayjsTemplate('dayjsTemplate'));
  const actions = useSetPlayerStore();

  const handleLocation = (url: string) => {
    if (isMobile) {
      window.location.href = url;
    } else {
      openWindow(url);
    }
  };

  const mutateDelete = useMutation({
    mutationKey: ['deleteSetlist'],
    mutationFn: async ({ session, videoId }: { session: Session; videoId: string }) => {
      const response = await axios.delete<DeleteSetlistRes>(`/api/v1/setlist/${videoId}`, {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });
      return response.data.data;
    },
    onSuccess: () => {
      toast.success(t('deleted'));
      queryClient.invalidateQueries({ queryKey: ['searchSetlist'] });
      actions.reset();
      router.back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deletePermission = session && session.user.userLv >= SETLIST_DELETE_LEVEL;

  return (
    <div className={css.wrap}>
      <nav className={css.nav}>
        <Button
          className={css.backButton}
          classNames={{ label: css.buttonLabel }}
          variant="transparent"
          onClick={() => router.back()}
        >
          <IonArrowBack width="1.2rem" height="1.2rem" />
          <span>{t('back')}</span>
        </Button>
        <div className={css.navRight}>
          {deletePermission && (
            <Button
              className={css.navItem}
              color="red"
              onClick={() => {
                if (confirm(t('deleteConfirm')))
                  mutateDelete.mutate({ session, videoId: setlist.videoId });
              }}
              loading={mutateDelete.isPending}
              disabled={!session}
            >
              <span className={css.letterWide}>삭제</span>
            </Button>
          )}
          <Button
            className={cx(css.navItem, css.hoverButton)}
            classNames={{ label: css.buttonLabel }}
            variant="transparent"
            onClick={() => handleLocation(videoUrl)}
          >
            <LogosYoutubeIcon width="1.2rem" height="1.2rem" />
            {t('youtube')}
          </Button>
          <Button
            component={Link}
            className={cx(css.navItem, css.hoverButton)}
            classNames={{ label: css.buttonLabel }}
            variant="transparent"
            href="/setlist"
          >
            <BiMusicNoteList width="1.2rem" height="1.2rem" />
            {t('list')}
          </Button>
        </div>
      </nav>
      <div className={css.infoSection}>
        <h2 className={css.title}>{setlist.title}</h2>
        <button className={css.channel} onClick={() => handleLocation(channelUrl)}>
          <Avatar className={css.avatar} src={icon} alt={t('avatarAlt')} size="md" />
          <p className={css.channelName}>{channel.nameKor}</p>
        </button>
        <br />
        <div>
          {t('streamDate')}: {broadcast}
        </div>
        <div>
          {t('createDate')}: {create}
        </div>
        <div>
          {t('lastModified')}: {update}
        </div>
      </div>
    </div>
  );
}
