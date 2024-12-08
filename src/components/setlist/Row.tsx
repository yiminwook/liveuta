/* eslint-disable @next/next/no-img-element */
import useModalStore from '@/hooks/useModalStore';
import { ChannelDataset } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { replaceParentheses } from '@/utils/regexp';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import SetlistModal from './SetlistModal';
import css from './Table.module.scss';

export type RowProps = {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
  order: 'broadcast' | 'create';
};

export default function Row({ setlist, channel, order }: RowProps) {
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);
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

  if (!isDesktop) {
    return (
      <div className={css.mobileRow} onClick={openModal}>
        <div className={css.mobileLeft}>
          <button className={css.imageButton} onClick={handleImageClick}>
            <div className={css.thumbnailBox}>
              <img src={thumbnailUrl} alt={setlist.title} />
            </div>
          </button>
        </div>
        <div className={css.mobileRight}>
          <p className={css.mobileChannelName}>{channel?.nameKor}</p>
          <p className={css.mobileTitle}>{replacedTitle}</p>
          <time className={css.mobileTime}>{order === 'broadcast' ? create : broad}</time>
        </div>
      </div>
    );
  }

  return (
    <div className={css.row} onClick={openModal}>
      <div className={css.cell}>
        <button className={css.imageButton} onClick={handleImageClick}>
          <div className={css.thumbnailBox}>
            <img src={thumbnailUrl} alt={replacedTitle} />
          </div>
        </button>
      </div>
      <div className={css.cell}>{channel?.nameKor}</div>
      <div className={cx(css.cell, css.flex2)}>
        <p>{replacedTitle}</p>
      </div>
      <div className={css.cell}>{order ? create : broad}</div>
    </div>
  );
}
