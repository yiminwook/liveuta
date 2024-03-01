import { Setlist } from '@/model/oracleDB/setlist/service';
import dayjs from 'dayjs';
import Text from './Text';
import { openWindow } from '@inner/_lib/windowEvent';
import * as styles from './table.css';
import cx from 'classnames';
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import Image from 'next/image';
import { generateVideoUrl } from '@/model/youtube/url';

interface RowProps {
  setlist: Setlist;
  channel?: ChannelDataset['channel_id'];
}
export default function Row({ setlist, channel }: RowProps) {
  const videoUrl = generateVideoUrl(setlist.videoId);
  const thumbnailUrl = generateThumbnail(setlist.videoId, 'default');
  const update = dayjs(setlist.updatedAt).format('YYYY-MM-DD HH:mm:ss');
  // const create = dayjs(setlist.createdAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className={styles.row}>
      <div className={cx(styles.cell, 'flex2')}>
        <button onClick={() => openWindow(videoUrl)}>
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
  );
}

// {setlist.description.split('\n').map((line, index) => (
//   <Text key={`${setlist.videoId}_row_${index}`} text={line} />
// ))}
