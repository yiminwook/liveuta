'use client';
import { clientApi } from '@/apis/fetcher';
import { SETLISTS_TAG } from '@/constants/revalidateTag';
import { ClientOnly } from '@/libraries/clientOnly';
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
  const t = useTranslations();
  const actions = useSetPlayerStore();

  const handleLocation = (url: string) => {
    if (isMobile) {
      window.location.href = url;
    } else {
      openWindow(url);
    }
  };

  const mutateDelete = useMutation({
    mutationFn: async ({ session, videoId }: { session: Session; videoId: string }) => {
      const json = await clientApi
        .delete<DeleteSetlistRes>(`v1/setlist/${videoId}`, {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        })
        .json();
      return json.data;
    },
    onSuccess: () => {
      toast.success(t('setlistId.info.deleted'));
      queryClient.invalidateQueries({ queryKey: [SETLISTS_TAG] });
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
          <span>{t('setlistId.info.back')}</span>
        </Button>
        <div className={css.navRight}>
          {deletePermission && (
            <Button
              className={css.navItem}
              color="red"
              onClick={() => {
                if (confirm(t('setlistId.info.deleteConfirm')))
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
            {t('setlistId.info.youtube')}
          </Button>
          <Button
            component={Link}
            className={cx(css.navItem, css.hoverButton)}
            classNames={{ label: css.buttonLabel }}
            variant="transparent"
            href="/setlist"
          >
            <BiMusicNoteList width="1.2rem" height="1.2rem" />
            {t('setlistId.info.list')}
          </Button>
        </div>
      </nav>
      <div className={css.infoSection}>
        <h2 className={css.title}>{setlist.title}</h2>
        <button className={css.channel} onClick={() => handleLocation(channelUrl)}>
          <Avatar className={css.avatar} src={icon} alt={t('setlistId.info.avatarAlt')} size="md" />
          <p className={css.channelName}>{channel.nameKor}</p>
        </button>
        <br />
        <ClientOnly>
          <TimeBoxs
            broadcastAt={setlist.broadcastAt}
            createdAt={setlist.createdAt}
            updatedAt={setlist.updatedAt}
          />
        </ClientOnly>
      </div>
    </div>
  );
}

interface TimeBoxProps {
  broadcastAt: string;
  createdAt: string;
  updatedAt: string;
}

function TimeBoxs({ broadcastAt, createdAt, updatedAt }: TimeBoxProps) {
  const t = useTranslations();
  const locale = useLocale();

  const broadcast = dayjs(broadcastAt).locale(locale).format(t('dayjsTemplate'));
  const create = dayjs(createdAt).locale(locale).format(t('dayjsTemplate'));
  const update = dayjs(updatedAt).locale(locale).format(t('dayjsTemplate'));
  return (
    <>
      <div>
        {t('setlistId.info.streamDate')}: {broadcast}
      </div>
      <div>
        {t('setlistId.info.createDate')}: {create}
      </div>
      <div>
        {t('setlistId.info.lastModified')}: {update}
      </div>
    </>
  );
}
