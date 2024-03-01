import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import { generateVideoUrl } from '@/model/youtube/url';
import cx from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as styles from './table.css';
import { MouseEvent } from 'react';
import { useSetlistModalAtom } from '../_lib/atom';
import SetlistModal from './SetlistModal';

export type RowProps = {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
};

export default function Row({ setlist, channel }: RowProps) {
  const router = useRouter();
  const [modalValue, setModalValue] = useSetlistModalAtom();
  const videoUrl = generateVideoUrl(setlist.videoId);
  const thumbnailUrl = generateThumbnail(setlist.videoId, 'default');
  const update = dayjs(setlist.updatedAt).format('YYYY-MM-DD HH:mm:ss');
  // const create = dayjs(setlist.createdAt).format('YYYY-MM-DD HH:mm:ss');

  const handleImageClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/setlist/${setlist.videoId}`);
  };

  const openModal = () => {
    setModalValue(() => ({ setlist, channel }));
  };

  return (
    <>
      <div className={cx(styles.row, 'hover')} onClick={openModal}>
        <div className={cx(styles.cell, 'flex2')}>
          <button onClick={handleImageClick}>
            <div className={styles.thumbnailBox}>
              <Image src={thumbnailUrl} alt={setlist.title} fill unoptimized={false} />
            </div>
          </button>
        </div>
        <div className={styles.cell}>{channel?.name_kor}</div>
        <div className={cx(styles.cell, 'flex2')}>
          <p>{setlist.title}</p>
        </div>
        <div className={styles.cell}>{update}</div>
      </div>
      {modalValue && <SetlistModal />}
    </>
  );
}
