'use client';
import dayjs from '@/libraries/dayjs';
import { ChannleDatesetItem } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateChannelUrl, generateVideoUrl } from '@/libraries/youtube/url';
import { playerVideoIdAtom } from '@/stores/player';
import { DeleteSetlistRes, SETLIST_DELETE_LEVEL } from '@/types/api/setlist';
import { openWindow } from '@/utils/windowEvent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import cx from 'classnames';
import { useResetAtom } from 'jotai/utils';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import { BsMusicNoteList } from 'react-icons/bs';
import { ImYoutube } from 'react-icons/im';
import { IoArrowBack } from 'react-icons/io5';
import { toast } from 'sonner';
import css from './Info.module.scss';

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
      const response = await axios.delete<DeleteSetlistRes>(`/api/v1/setlist/${videoId}`, {
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
    <div className={css.wrap}>
      <nav className={css.nav}>
        <button className={css.backButton} onClick={() => router.back()}>
          <IoArrowBack size={28} />
          <span>Back</span>
        </button>
        <div className={css.navRight}>
          {deletePermission && (
            <button
              className={css.navItem}
              data-variant="delete"
              onClick={() => {
                if (confirm('삭제 하시겠습니까?'))
                  mutateDelete.mutate({ session, videoId: setlist.videoId });
              }}
              disabled={mutateDelete.isPending}
            >
              <span className={css.letterWide}>삭제</span>
            </button>
          )}
          <button
            className={css.navItem}
            data-variant="youtube"
            onClick={() => handleLocation(videoUrl)}
          >
            <ImYoutube size={24} color="#ff0000" />
            유튜브
          </button>
          <Link className={css.navItem} data-variant="list" href="/setlist">
            <BsMusicNoteList />
            리스트
          </Link>
        </div>
      </nav>
      <h4 className={css.title}>{setlist.title}</h4>
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
