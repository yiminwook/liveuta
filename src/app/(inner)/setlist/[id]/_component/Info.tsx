'use client';
import { ChannleDatesetItem } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import dayjs from '@/model/dayjs';
import { generateVideoUrl, generateChannelUrl } from '@/model/youtube/url';
import * as styles from './info.css';
import Link from 'next/link';
import { openWindow } from '@inner/_lib/windowEvent';
import { BsMusicNoteList } from 'react-icons/bs';
import { ImYoutube } from 'react-icons/im';
import cx from 'classnames';

interface InfoProps {
  setlist: Setlist;
  channel: ChannleDatesetItem;
}
export default function Info({ setlist, channel }: InfoProps) {
  const videoUrl = generateVideoUrl(setlist.videoId);
  const channelUrl = generateChannelUrl(channel.channelId);
  const broadcast = dayjs(setlist.broadcastAt).format('YYYY-MM-DD HH:mm');
  const create = dayjs(setlist.createdAt).format('YYYY-MM-DD HH:mm');
  const update = dayjs(setlist.updatedAt).format('YYYY-MM-DD HH:mm');

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <button
          className={cx(styles.navItem, styles.youtubeButton)}
          onClick={() => openWindow(videoUrl)}
        >
          <ImYoutube size={28} color="#ff0000" />
          유투브
        </button>
        <Link className={cx(styles.navItem, styles.listLink)} href="/setlist">
          <BsMusicNoteList />
          리스트
        </Link>
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
