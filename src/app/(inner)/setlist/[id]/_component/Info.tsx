'use client';
import dayjs from '@/model/dayjs';
import { ChannleDatesetItem } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import { generateChannelUrl, generateVideoUrl } from '@/model/youtube/url';
import { openWindow } from '@inner/_lib/windowEvent';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsMusicNoteList } from 'react-icons/bs';
import { ImYoutube } from 'react-icons/im';
import { IoArrowBack } from 'react-icons/io5';
import * as styles from './info.css';

type InfoProps = {
  setlist: Setlist;
  channel: ChannleDatesetItem;
};

export default function Info({ setlist, channel }: InfoProps) {
  const router = useRouter();

  const videoUrl = generateVideoUrl(setlist.videoId);
  const channelUrl = generateChannelUrl(channel.channelId);

  const broadcast = dayjs(setlist.broadcastAt).format('YYYY년 MM월 DD일');
  const create = dayjs(setlist.createdAt).format('YYYY년 MM월 DD일');
  const update = dayjs(setlist.updatedAt).format('YYYY년 MM월 DD일');
  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <IoArrowBack size={28} />
          <span>Back</span>
        </button>
        <div className={styles.navRight}>
          <button
            className={cx(styles.navItem, styles.youtubeButton)}
            onClick={() => openWindow(videoUrl)}
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
        <button onClick={() => openWindow(channelUrl)}>{channel.nameKor}</button>
        <br />
        <div>방송일: {broadcast}</div>
        <div>작성일: {create}</div>
        <div>수정일: {update}</div>
      </div>
    </div>
  );
}
