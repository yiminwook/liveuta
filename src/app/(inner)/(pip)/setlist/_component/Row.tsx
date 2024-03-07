/* eslint-disable @next/next/no-img-element */
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { setlistModalAtom } from '../_lib/atom';
import * as styles from './list.css';

export type RowProps = {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
};

export default function Row({ setlist, channel }: RowProps) {
  const router = useRouter();
  const setModalValue = useSetAtom(setlistModalAtom);
  const thumbnailUrl = generateThumbnail(setlist.videoId, 'mqdefault');
  const broad = dayjs(setlist.broadcastAt).format('YYYY년 MM월 DD일');

  const handleImageClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/setlist/${setlist.videoId}`);
  };

  const openModal = () => {
    setModalValue(() => ({ setlist, channel }));
  };

  return (
    <div className={cx(styles.row, 'hover')} onClick={openModal}>
      <div className={cx(styles.cell)}>
        <button onClick={handleImageClick}>
          <div className={styles.thumbnailBox}>
            <img src={thumbnailUrl} alt={setlist.title} />
          </div>
        </button>
      </div>
      <div className={styles.cell}>{channel?.nameKor}</div>
      <div className={cx(styles.cell, 'flex2')}>
        <p>{setlist.title}</p>
      </div>
      <div className={styles.cell}>{broad}</div>
    </div>
  );
}
