'use client';
import dayjs from '@/libraries/dayjs';
import { ChannleDatesetItem } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateChannelUrl, generateVideoUrl } from '@/libraries/youtube/url';
import { openWindow } from '@/utils/windowEvent';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsMusicNoteList } from 'react-icons/bs';
import { ImYoutube } from 'react-icons/im';
import { IoArrowBack } from 'react-icons/io5';
import * as styles from './info.css';
import { isMobile } from 'react-device-detect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import { DeleteSetlistRes, SETLIST_DELETE_LEVEL } from '@/types/api/setlist';
import { useResetAtom } from 'jotai/utils';
import { playerVideoIdAtom } from '@/stores/player';

type InfoProps = {
  setlist: Setlist;
  channel: ChannleDatesetItem;
  session: Session | null;
};

export default function Info({ setlist, channel, session }: InfoProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const videoUrl = generateVideoUrl(setlist.videoId);
  const channelUrl = generateChannelUrl(channel.channelId);

  const broadcast = dayjs(setlist.broadcastAt).format('YYYY년 MM월 DD일');
  const create = dayjs(setlist.createdAt).format('YYYY년 MM월 DD일');
  const update = dayjs(setlist.updatedAt).format('YYYY년 MM월 DD일');
  const resetPlayerId = useResetAtom(playerVideoIdAtom);

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
      const response = await axios.delete<DeleteSetlistRes>(`/api/setlist/${videoId}`, {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['searchSetlist'] });
      resetPlayerId();
      router.back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deletePermission = session && session.user.userLv >= SETLIST_DELETE_LEVEL;

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <IoArrowBack size={28} />
          <span>Back</span>
        </button>
        <div className={styles.navRight}>
          {deletePermission && (
            <button
              className={cx(styles.navItem, styles.deleteButton)}
              onClick={() => {
                if (confirm('삭제 하시겠습니까?'))
                  mutateDelete.mutate({ session, videoId: setlist.videoId });
              }}
              disabled={mutateDelete.isPending}
            >
              삭 제
            </button>
          )}
          <button
            className={cx(styles.navItem, styles.youtubeButton)}
            onClick={() => handleLocation(videoUrl)}
          >
            <ImYoutube size={24} color="#ff0000" />
            유투브
          </button>
          <Link className={cx(styles.navItem, styles.listLink)} href="/setlist">
            <BsMusicNoteList />
            리스트
          </Link>
        </div>
      </nav>
      <h4 className={styles.title}>{setlist.title}</h4>
      <div>
        <button onClick={() => handleLocation(channelUrl)}>{channel.nameKor}</button>
        <br />
        <div>방송일: {broadcast}</div>
        <div>작성일: {create}</div>
        <div>수정일: {update}</div>
      </div>
    </div>
  );
}
