'use client';
import dayjs from '@/libraries/dayjs';
import { ChannelDatesetItem } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateChannelUrl, generateVideoUrl } from '@/libraries/youtube/url';
import { useSetPlayerStore } from '@/stores/player';
import { DeleteSetlistRes, SETLIST_DELETE_LEVEL } from '@/types/api/setlist';
import { openWindow } from '@/utils/windowEvent';
import { Avatar, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import cx from 'classnames';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { BsMusicNoteList } from 'react-icons/bs';
import { ImYoutube } from 'react-icons/im';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'sonner';
import css from './Info.module.scss';

type InfoProps = {
  setlist: Setlist;
  channel: ChannelDatesetItem;
  icon: string;
  session: Session | null;
};

export default function Info({ setlist, channel, icon, session }: InfoProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const videoUrl = generateVideoUrl(setlist.videoId);
  const channelUrl = generateChannelUrl(channel.channelId);

  const broadcast = dayjs(setlist.broadcastAt).format('YYYY년 MM월 DD일');
  const create = dayjs(setlist.createdAt).format('YYYY년 MM월 DD일');
  const update = dayjs(setlist.updatedAt).format('YYYY년 MM월 DD일');
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
      toast.success('삭제되었습니다.');
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
          <IoArrowBack size={24} />
          <span>Back</span>
        </Button>
        <div className={css.navRight}>
          {deletePermission && (
            <Button
              className={css.navItem}
              color="red"
              onClick={() => {
                if (confirm('삭제 하시겠습니까?'))
                  mutateDelete.mutate({ session, videoId: setlist.videoId });
              }}
              disabled={mutateDelete.isPending}
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
            <ImYoutube size={24} color="#ff0000" />
            유튜브
          </Button>
          <Button
            component={Link}
            className={cx(css.navItem, css.hoverButton)}
            classNames={{ label: css.buttonLabel }}
            variant="transparent"
            href="/setlist"
          >
            <BsMusicNoteList />
            리스트
          </Button>
        </div>
      </nav>
      <div className={css.infoSection}>
        <h2 className={css.title}>{setlist.title}</h2>
        <button className={css.channel} onClick={() => handleLocation(channelUrl)}>
          <Avatar className={css.avatar}>
            <Image
              className={css.channelIcon}
              src={icon}
              alt="채널 아이콘"
              width={38}
              height={38}
            />
          </Avatar>
          <p className={css.channelName}>{channel.nameKor}</p>
        </button>
        <br />
        <div>방송일: {broadcast}</div>
        <div>작성일: {create}</div>
        <div>수정일: {update}</div>
      </div>
    </div>
  );
}
