/* eslint-disable @next/next/no-img-element */
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import * as styles from './table.css';
import { useMediaQuery } from 'react-responsive';
import { BREAK_POINT } from '@/style/var';
import { replaceParentheses } from '@/app/_lib/regexp';
import useModalStore from '@/hook/useModalStore';
import SetlistModal from '../_modal/SetlistModal';

export type RowProps = {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
  order: 'broadcast' | 'create';
};

export default function Row({ setlist, channel, order }: RowProps) {
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAK_POINT.md}px)` });
  const router = useRouter();
  const modalStore = useModalStore();
  const thumbnailUrl = generateThumbnail(setlist.videoId, 'mqdefault');
  const create = dayjs(setlist.createdAt).format('YYYY년 MM월 DD일');
  const broad = dayjs(setlist.broadcastAt).format('YYYY년 MM월 DD일');

  const handleImageClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/setlist/${setlist.videoId}`);
  };

  const openModal = async () => {
    await modalStore.push(SetlistModal, {
      props: {
        setlist,
        channel,
        order,
      },
    });
  };

  const replacedTitle = replaceParentheses(setlist.title);

  if (isMobile) {
    return (
      <div className={cx(styles.mobileRow, 'hover')} onClick={openModal}>
        <div className={cx(styles.mobileLeft)}>
          <button className={styles.imageButton} onClick={handleImageClick}>
            <div className={styles.thumbnailBox}>
              <img src={thumbnailUrl} alt={setlist.title} />
            </div>
          </button>
        </div>
        <div className={styles.mobileRight}>
          <p className={styles.mobileChannelName}>{channel?.nameKor}</p>
          <p className={styles.mobileTitle}>{replacedTitle}</p>
          <time className={styles.mobileTime}>{order === 'broadcast' ? create : broad}</time>
        </div>
      </div>
    );
  }

  return (
    <div className={cx(styles.row, 'hover')} onClick={openModal}>
      <div className={cx(styles.cell)}>
        <button className={styles.imageButton} onClick={handleImageClick}>
          <div className={styles.thumbnailBox}>
            <img src={thumbnailUrl} alt={replacedTitle} />
          </div>
        </button>
      </div>
      <div className={styles.cell}>{channel?.nameKor}</div>
      <div className={cx(styles.cell, 'flex2')}>
        <p>{replacedTitle}</p>
      </div>
      <div className={styles.cell}>{order ? create : broad}</div>
    </div>
  );
}
