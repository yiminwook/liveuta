import { ChannleDatesetItem } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import dayjs from '@/model/dayjs';
import { generateVideoUrl } from '@/model/youtube/url';
import * as styles from './info.css';
import Link from 'next/link';

interface InfoProps {
  setlist: Setlist;
  channel: ChannleDatesetItem;
}
export default function Info({ setlist, channel }: InfoProps) {
  const url = generateVideoUrl(setlist.videoId);
  const broadcast = dayjs(setlist.broadcastAt).format('YYYY-MM-DD HH:mm');
  const create = dayjs(setlist.createdAt).format('YYYY-MM-DD HH:mm');
  const update = dayjs(setlist.updatedAt).format('YYYY-MM-DD HH:mm');

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <Link href="/setlist">리스트</Link>
        <button>편집(미구현)</button>
      </nav>
      <h4 className={styles.title}>{setlist.title}</h4>
      <div>
        <div>{url}</div>
        <div>{channel.name_kor}</div>
        <div>{channel.channel_addr}</div>
        <div>방송일: {broadcast}</div>
        <div>작성일: {create}</div>
        <div>수정일: {update}</div>
      </div>
    </div>
  );
}
